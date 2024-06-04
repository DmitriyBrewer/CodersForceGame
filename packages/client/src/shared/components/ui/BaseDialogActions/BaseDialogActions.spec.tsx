import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseDialogActions from './BaseDialogActions'

describe('<BaseDialogActions />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseDialogActions />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseDialogActions />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
