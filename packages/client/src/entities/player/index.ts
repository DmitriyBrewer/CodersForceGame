import { InputStates, Position, Speed, SpriteConfig } from '@/entities/types/types'

import SpriteImage from '../sprite-image'
import SpriteAnimation from '../sprite-animation'
import Collision, { Entity } from '../game/utils/Сollision'

class Player implements Entity {
  static maxSpeed = 0.5

  static RUNNING = 'running'

  static EXPLODING = 'exploding'

  private readonly _ctx: CanvasRenderingContext2D

  private _inputStates: InputStates

  private _position: Position

  private readonly _scale: number

  private _state: string

  private _sprite!: SpriteImage

  private _explosion!: SpriteAnimation

  private _speed!: Speed

  constructor(ctx: CanvasRenderingContext2D, inputStates: InputStates) {
    this._ctx = ctx
    this._inputStates = inputStates
    this._position = {
      xPosition: 0,
      yPosition: 0
    }
    this._scale = 0.7
    this._state = Player.RUNNING
  }

  get height(): number {
    return this._sprite.height * this._scale
  }

  get width(): number {
    return this._sprite.width * this._scale
  }

  get speed(): Speed {
    return this._speed
  }

  get position(): Position {
    return this._position
  }

  setState(state: string): void {
    if (this._state !== state) {
      this._state = state
      this._explosion.reset()
    }
  }

  setImage(img: HTMLImageElement, spriteConfig: SpriteConfig): void {
    this._sprite = new SpriteImage(img, spriteConfig)
  }

  setExplosion(img: HTMLImageElement): void {
    this._explosion = new SpriteAnimation()
    this._explosion.extractSprites(img, 16, 10, 64, 64)
  }

  checkCollision(...entities: Entity[]): boolean {
    return !!entities.find(entity => Collision.collision(this, entity, -20))
  }

  moveToStartPosition(): void {
    const { height: canvasHeight, width: canvasWidth } = this._ctx.canvas
    this._position = {
      xPosition: canvasWidth / 2 - (this._sprite.width * this._scale) / 2,
      yPosition: canvasHeight - 16 - this._sprite.height * this._scale
    }
  }

  update(deltaTime: number): void {
    switch (this._state) {
      case Player.RUNNING:
        if (this._inputStates.left) {
          this._position.xPosition -= Player.maxSpeed * deltaTime
        }
        if (this._inputStates.right) {
          this._position.xPosition += Player.maxSpeed * deltaTime
        }

        this._sprite.draw(this._ctx, {
          position: {
            xPosition: this._position.xPosition,
            yPosition: this._position.yPosition
          },
          scale: this._scale
        })
        break

      case Player.EXPLODING:
        this._explosion.draw(this._ctx, this._position.xPosition, this._position.yPosition)
        break

      default:
        break
    }
  }
}

export default Player
