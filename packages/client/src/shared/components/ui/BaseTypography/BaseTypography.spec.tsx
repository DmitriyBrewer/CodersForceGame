import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseTypography from './BaseTypography'

describe('<BaseTypography />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseTypography onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseTypography />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
