import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseLink from '@/shared/components/ui/BaseLink'

describe('<BaseLink />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseLink onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseLink />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
