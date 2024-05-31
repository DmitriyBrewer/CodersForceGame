import { renderHook, act } from '@testing-library/react-hooks'

import { useModal } from './useModal'

describe('useModal', () => {
  test('should initialize with modal closed', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.open).toBe(false)
  })

  test('should open the modal when handleOpen is called', () => {
    const { result } = renderHook(() => useModal())
    act(() => {
      result.current.handleOpen()
    })
    expect(result.current.open).toBe(true)
  })

  test('should close the modal when handleClose is called', () => {
    const { result } = renderHook(() => useModal())
    act(() => {
      result.current.handleOpen()
    })
    act(() => {
      result.current.handleClose()
    })
    expect(result.current.open).toBe(false)
  })
})
