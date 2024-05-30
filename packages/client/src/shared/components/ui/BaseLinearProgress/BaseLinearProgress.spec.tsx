import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseLinearProgress from './BaseLinearProgress'

describe('<BaseLinearProgress />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseLinearProgress onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseLinearProgress />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
