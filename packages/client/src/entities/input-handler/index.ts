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
          case 'a':
          case 'A':
            inputStates.left = true
            break
          case 'ArrowUp':
          case 'W':
          case 'w':
            inputStates.up = true
            break
          case 'ArrowRight':
          case 'D':
          case 'd':
            inputStates.right = true
            break
          case 'ArrowDown':
          case 'S':
          case 's':
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
          case 'a':
          case 'A':
            inputStates.left = false
            break
          case 'ArrowUp':
          case 'W':
          case 'w':
            inputStates.up = false
            break
          case 'ArrowRight':
          case 'D':
          case 'd':
            inputStates.right = false
            break
          case 'ArrowDown':
          case 'S':
          case 's':
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
