import { InputStates } from '@/entities/types/types'

class InputHandler {
  static listen(inputStates: InputStates = {}): void {
    this.addWindowListeners(inputStates)
  }

  static addWindowListeners(inputStates: InputStates): void {
    const keyMap = {
      left: ['ArrowLeft', 'a', 'A', 'Ф', 'ф'],
      up: ['ArrowUp', 'w', 'W', 'Ц', 'ц'],
      right: ['ArrowRight', 'd', 'D', 'В', 'в'],
      down: ['ArrowDown', 's', 'S', 'Ы', 'ы'],
      space: [' ']
    }

    const handleKeyEvent = (event: KeyboardEvent, isKeyDown: boolean) => {
      Object.entries(keyMap).forEach(([key, values]) => {
        if (values.includes(event.key)) {
          inputStates[key] = isKeyDown
        }
      })
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => handleKeyEvent(event, true), false)
    document.addEventListener('keyup', (event: KeyboardEvent) => handleKeyEvent(event, false), false)
  }
}

export default InputHandler
