// import { render, screen } from '@testing-library/react'

// import App from './App'

// const appContent = 'Develop stand'

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }))

// TODO: feature/cfg-15 вернуть тесты
test('Example test', async () => {
  // render(<App />)
  // expect(screen.getByText(appContent)).toBeDefined()
})
