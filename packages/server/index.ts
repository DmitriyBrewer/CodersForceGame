import dotenv from 'dotenv'
import cors from 'cors'
import { ViteDevServer, createServer as createViteServer } from 'vite'

import express from 'express'
import serialize from 'serialize-javascript'

import type { RenderResult } from 'client/src/shared/types'

import * as fs from 'fs'
import * as path from 'path'

import topicsRouter from './routes/topics'
import commentsRouter from './routes/comments'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  app.use('/api/topics', topicsRouter)
  app.use('/api/comments', commentsRouter)

  // TODO: feature/cfg-88 удалить, если будет не нужен
  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string | undefined

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite?.transformIndexHtml(url, template)
      }

      let render: (requestUrl: string) => Promise<RenderResult>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite?.ssrLoadModule(path.resolve(srcPath, 'src/entry-server.tsx')))?.render
      }

      const { appHtml, preloadedState } = await render(url)
      const html = template?.replace('<!--ssr-outlet-->', appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(preloadedState, {
          isJSON: true
        })}</script>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite?.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
