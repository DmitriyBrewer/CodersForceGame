import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseButton from './BaseButton'

describe('<BaseButton />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseButton onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseButton />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
