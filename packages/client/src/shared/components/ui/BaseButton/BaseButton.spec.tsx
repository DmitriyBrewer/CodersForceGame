import { render, screen } from '@testing-library/react'
import { act } from 'react'

import '@testing-library/jest-dom'
import BaseButton from './BaseButton'

describe('<BaseButton />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    let asFragment: () => DocumentFragment = () => document.createDocumentFragment()

    act(() => {
      const result = render(<BaseButton onClick={handleClick} />)
      asFragment = result.asFragment
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    act(() => {
      render(<BaseButton />)
    })
    const button = screen.getByRole('button')
    expect(button).toMatchSnapshot()
  })
})
