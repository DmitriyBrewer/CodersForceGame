import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import CreateTopicDialog from './CreateTopicDialog'

describe('<CreateTopicDialog />', () => {
  const handleClose = jest.fn()

  it('Снимок правильный', () => {
    const { asFragment } = render(<CreateTopicDialog open onClose={handleClose} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Правильно рендерится, когда открыт', () => {
    render(<CreateTopicDialog open onClose={handleClose} />)

    const dialog = screen.getByRole('dialog')
    const title = screen.getByLabelText('Заголовок')
    const description = screen.getByLabelText('Описание')

    expect(dialog).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('Вызывает onClose при нажатии на кнопку "Отмена"', () => {
    render(<CreateTopicDialog open onClose={handleClose} />)

    const cancelButton = screen.getByText('Отмена')
    fireEvent.click(cancelButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('Правильно рендерится с использованием стандартных свойств', () => {
    const { asFragment } = render(<CreateTopicDialog open onClose={handleClose} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
