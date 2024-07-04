import { render } from '@testing-library/react'
import { act } from 'react'

import '@testing-library/jest-dom'
import BaseAvatar from './BaseAvatar'

describe('<BaseAvatar />', () => {
  it('Snapshot is correct', () => {
    let asFragment: () => DocumentFragment = () => document.createDocumentFragment()

    act(() => {
      const result = render(<BaseAvatar />)
      asFragment = result.asFragment
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
