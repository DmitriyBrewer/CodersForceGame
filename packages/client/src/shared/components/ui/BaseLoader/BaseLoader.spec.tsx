import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseLoader from './BaseLoader'

describe('<BaseLoader />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseLoader onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseLoader />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
