import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseDialogTitle from './BaseDialogTitle'

describe('<BaseDialogTitle />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseDialogTitle onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseDialogTitle />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
