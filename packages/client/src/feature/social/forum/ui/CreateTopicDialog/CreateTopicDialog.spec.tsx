import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import configureStore from 'redux-mock-store'

import { Provider } from 'react-redux'

import { Store } from '@reduxjs/toolkit'

import CreateTopicDialog from './CreateTopicDialog'

const mockStore = configureStore([])

describe('<CreateTopicDialog />', () => {
  const handleClose = jest.fn()
  let store: Store

  beforeEach(() => {
    store = mockStore({
      user: {
        userData: {
          first_name: 'testName'
        }
      }
    })
  })

  function renderWithProvider(component: React.ReactElement) {
    return render(<Provider store={store}>{component}</Provider>)
  }

  it('Снимок правильный', () => {
    const { asFragment } = renderWithProvider(<CreateTopicDialog open onClose={handleClose} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Правильно рендерится, когда открыт', () => {
    renderWithProvider(<CreateTopicDialog open onClose={handleClose} />)

    const dialog = screen.getByRole('dialog')
    const title = screen.getByLabelText('Заголовок')
    const description = screen.getByLabelText('Описание')

    expect(dialog).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('Вызывает onClose при нажатии на кнопку "Отмена"', () => {
    renderWithProvider(<CreateTopicDialog open onClose={handleClose} />)

    const cancelButton = screen.getByText('Отмена')
    fireEvent.click(cancelButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('Правильно рендерится с использованием стандартных свойств', () => {
    const { asFragment } = renderWithProvider(<CreateTopicDialog open onClose={handleClose} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
