import { render, screen } from '@testing-library/react'
import { act } from 'react'

import '@testing-library/jest-dom'
import BaseTextField from './BaseTextField'

describe('<BaseTextField />', () => {
  it('Snapshot is correct', () => {
    let asFragment: () => DocumentFragment = () => document.createDocumentFragment()

    act(() => {
      const result = render(<BaseTextField />)
      asFragment = result.asFragment
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    act(() => {
      render(<BaseTextField />)
    })
    const textbox = screen.getByRole('textbox')

    expect(textbox).toBeInTheDocument()
    expect(textbox).toMatchSnapshot()
  })
})
