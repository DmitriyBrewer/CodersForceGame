import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseDialog from './BaseDialog'

describe('<BaseDialog />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseDialog open />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseDialog open />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
