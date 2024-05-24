import App from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Develop stand'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

// TODO: вернуть тесты
test('Example test', async () => {
  // render(<App />)
  // expect(screen.getByText(appContent)).toBeDefined()
})
