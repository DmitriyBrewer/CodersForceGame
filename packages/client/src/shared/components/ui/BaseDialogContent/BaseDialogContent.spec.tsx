import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseDialogContent from './BaseDialogContent'

describe('<BaseDialogContent />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseDialogContent />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseDialogContent />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
