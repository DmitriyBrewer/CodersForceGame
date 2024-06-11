import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseAvatar from './BaseAvatar'

describe('<BaseAvatar />', () => {
  const handleClick = jest.fn()

  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseAvatar />)
    expect(asFragment()).toMatchSnapshot()
  })
})
