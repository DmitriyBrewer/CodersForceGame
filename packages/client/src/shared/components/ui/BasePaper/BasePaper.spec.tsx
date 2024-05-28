import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BasePaper from './BasePaper'

describe('<BasePaper />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BasePaper />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BasePaper />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
