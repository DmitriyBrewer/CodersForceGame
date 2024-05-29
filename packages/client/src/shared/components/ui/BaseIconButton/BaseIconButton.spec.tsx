import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseIconButton from './BaseIconButton'

describe('<BaseIconButton />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseIconButton onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseIconButton />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
