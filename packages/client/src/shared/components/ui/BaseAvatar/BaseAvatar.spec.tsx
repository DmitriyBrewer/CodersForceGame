import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseAvatar from './BaseAvatar'

describe('<BaseAvatar />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseAvatar />)
    expect(asFragment()).toMatchSnapshot()
  })
})
