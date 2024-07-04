import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseLinearProgress from './BaseLinearProgress'

describe('<BaseLinearProgress />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseLinearProgress />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseLinearProgress />)
    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toBeInTheDocument()
    expect(progressbar).toMatchSnapshot()
  })
})
