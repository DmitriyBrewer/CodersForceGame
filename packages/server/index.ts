import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'

import express from 'express'
import serialize from 'serialize-javascript'

import * as fs from 'fs'
import * as path from 'path'

import topicsRouter from './routes/topics'
import commentsRouter from './routes/comments'

type RenderResult = {
  appHtml: string
  preloadedState: unknown
}

dotenv.config()

const isDev = () => process.env.VITE_NODE_ENV === 'development'

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  credentials: true,
  optionsSuccessStatus: 200
}

async function startServer() {
  const app = express()

  app.use((_, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `${process.env.VITE_CSP_DEFAULT} ` +
        `${process.env.VITE_CSP_SCRIPTS} ` +
        `${process.env.VITE_CSP_STYLES} ` +
        `${process.env.VITE_CSP_FONTS} ` +
        `${process.env.VITE_CSP_IMAGES} ` +
        `${process.env.VITE_CSP_CONNECT}`
    )
    next()
  })

  app.use(express.json())
  app.use(cors(corsOptions))

  const port = Number(process.env.VITE_SERVER_PORT) || 8000

  let distPath = ''
  let srcPath = ''
  let ssrClientPath = ''

  if (isDev()) {
    distPath = path.dirname(require.resolve('client/dist/index.html'))
    srcPath = path.dirname(require.resolve('client'))
    ssrClientPath = require.resolve('client/ssr-dist/client.cjs')
  } else {
    distPath = path.resolve('/app/')
    srcPath = path.resolve('/app/packages/client')
    ssrClientPath = path.resolve('/app/client.cjs')
  }

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('/api/topics', topicsRouter)
  app.use('/api/comments', commentsRouter)

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
      }
      if (vite) {
        template = await vite.transformIndexHtml(url, template)
      } else {
        throw new Error('Vite is not initialized')
      }

      let render: (requestUrl: string) => Promise<RenderResult>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render

        const { appHtml, preloadedState } = await render(url)

        const html = template?.replace('<!--ssr-outlet-->', appHtml).replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(preloadedState, {
            isJSON: true
          })}</script>`
        )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } else if (vite) {
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'src/entry-server.tsx'))).render

        const { appHtml, preloadedState } = await render(url)
        const html = template?.replace('<!--ssr-outlet-->', appHtml).replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(preloadedState, {
            isJSON: true
          })}</script>`
        )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }
    } catch (e) {
      if (isDev()) {
        if (vite) {
          vite.ssrFixStacktrace(e as Error)
        }
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
