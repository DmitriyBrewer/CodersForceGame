import { Position, Speed } from '@/entities/types/types'

export interface Entity {
  position: Position
  width: number
  height: number
  speed?: Speed
  moveToStartPosition?: () => void
}

class Collision {
  static rectangles(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
    extra = 0
  ): boolean {
    if (x1 > x2 + w2 + extra || x1 + w1 + extra < x2) return false
    return !(y1 > y2 + h2 + extra || y1 + h1 + extra < y2)
  }

  static collision(entity1: Entity, entity2: Entity, extra = 0): boolean {
    const { height: h1, width: w1 } = entity1
    const { height: h2, width: w2 } = entity2

    const { xPosition: x1, yPosition: y1 } = entity1.position
    const { xPosition: x2, yPosition: y2 } = entity2.position

    return this.rectangles(x1, y1, w1, h1, x2, y2, w2, h2, extra)
  }
}

export default Collision
