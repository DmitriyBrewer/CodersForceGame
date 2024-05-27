import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseBox from './BaseBox'

describe('<BaseBox />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseBox onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseBox />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
