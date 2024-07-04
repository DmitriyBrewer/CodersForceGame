import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import BaseLink from '@/shared/components/ui/BaseLink'
import { paths } from '@/shared/config/routing'

describe('<BaseLink />', () => {
  it('Snapshot is correct', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <BaseLink to="/" />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders correctly with default props', () => {
    render(
      <BrowserRouter>
        <BaseLink to={paths.home} />
      </BrowserRouter>
    )
    const link = screen.getByRole('link')

    expect(link).toMatchSnapshot()
  })
})
