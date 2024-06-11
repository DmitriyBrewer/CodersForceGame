import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseInput from './BaseInput'

describe('<BaseInput />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseInput onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseInput />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
