import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BasePaperPolymorphic from './BasePaperPolymorphic'

describe('<BasePaperPolymorphic />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BasePaperPolymorphic />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BasePaperPolymorphic />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
