import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseTextField from './BaseTextField'

describe('<BaseTextField />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseTextField />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseTextField />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
