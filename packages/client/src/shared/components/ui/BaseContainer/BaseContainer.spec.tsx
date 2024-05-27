import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseContainer from './BaseContainer'

describe('<BaseContainer />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseContainer onClick={handleClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseContainer />)
    const button = screen.getByRole('button')

    expect(button).toMatchSnapshot()
  })
})
