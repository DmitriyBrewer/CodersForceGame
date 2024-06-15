import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import BaseLink from '@/shared/components/ui/BaseLink'
import { paths } from '@/shared/config/routing'

describe('<BaseLink />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(<BaseLink to="/" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(<BaseLink to={paths.home} />)
    const button = screen.getByRole('a')

    expect(button).toMatchSnapshot()
  })
})
