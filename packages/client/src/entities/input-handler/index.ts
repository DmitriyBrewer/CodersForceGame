import { InputStates } from '@/entities/types/types'

class InputHandler {
  static listen(inputStates: InputStates = {}): void {
    this.addWindowListeners(inputStates)
  }

  static addWindowListeners(inputStates: InputStates): void {
    document.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowLeft':
            inputStates.left = true
            break
          case 'ArrowUp':
            inputStates.up = true
            break
          case 'ArrowRight':
            inputStates.right = true
            break
          case 'ArrowDown':
            inputStates.down = true
            break
          case ' ':
            inputStates.space = true
            break
          default:
            break
        }
      },
      false
    )

    document.addEventListener(
      'keyup',
      (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowLeft':
            inputStates.left = false
            break
          case 'ArrowUp':
            inputStates.up = false
            break
          case 'ArrowRight':
            inputStates.right = false
            break
          case 'ArrowDown':
            inputStates.down = false
            break
          case ' ':
            inputStates.space = false
            break
          default:
            break
        }
      },
      false
    )
  }
}

export default InputHandler
