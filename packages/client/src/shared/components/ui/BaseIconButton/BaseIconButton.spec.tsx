import { render, screen } from '@testing-library/react'
import { act } from 'react'

import '@testing-library/jest-dom'
import BaseIconButton from './BaseIconButton'

describe('<BaseIconButton />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    let asFragment: () => DocumentFragment = () => document.createDocumentFragment()

    act(() => {
      const result = render(<BaseIconButton onClick={handleClick} />)
      asFragment = result.asFragment
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    act(() => {
      render(<BaseIconButton />)
    })
    const button = screen.getByRole('button')
    expect(button).toMatchSnapshot()
  })
})
