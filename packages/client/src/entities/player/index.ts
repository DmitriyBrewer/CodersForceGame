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

  private _scale: number

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
    this._scale = 0.79
    this._state = Player.RUNNING
  }

  get height(): number {
    return this._sprite.spriteConfig.height * this._scale
  }

  get width(): number {
    return this._sprite.spriteConfig.width * this._scale
  }

  get speed(): Speed {
    return this._speed
  }

  get position(): Position {
    return this._position
  }

  get inputStates() {
    return this._inputStates
  }

  set inputStates(value: InputStates) {
    this._inputStates = value
  }

  get state() {
    return this._state
  }

  set state(value: string) {
    this._state = value
  }

  get explosion() {
    return this._explosion
  }

  set explosion(value: SpriteAnimation) {
    this._explosion = value
  }

  get sprite() {
    return this._sprite
  }

  set sprite(value: SpriteImage) {
    this._sprite = value
  }

  get scale() {
    return this._scale
  }

  set scale(value: number) {
    this._scale = value
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
    this._explosion.extractSprites(img, { numberOfPostures: 16, numberOfFramesPerPosture: 10, width: 64, height: 64 })
  }

  checkCollision(...entities: Entity[]): boolean {
    return !!entities.find(entity => Collision.collision(this, entity, -20))
  }

  moveToStartPosition(): void {
    const { height: canvasHeight, width: canvasWidth } = this._ctx.canvas
    const { height: spriteHeight, width: spriteWidth } = this._sprite.spriteConfig
    this._position = {
      xPosition: canvasWidth / 2 - (spriteWidth * this._scale) / 2,
      yPosition: canvasHeight - 16 - spriteHeight * this._scale
    }
  }

  update(deltaTime: number): void {
    switch (this._state) {
      case Player.RUNNING:
        if (this._inputStates.left) {
          this._position.xPosition -= Player.maxSpeed * deltaTime * 0.6
        }
        if (this._inputStates.right) {
          this._position.xPosition += Player.maxSpeed * deltaTime * 0.6
        }
        if (this._inputStates.up && this._position.yPosition > 100) {
          this._position.yPosition -= Player.maxSpeed * deltaTime * 0.25
        }
        if (this._inputStates.down && this._position.yPosition < 430) {
          this._position.yPosition += Player.maxSpeed * deltaTime * 0.3
        }

        if (this._sprite) {
          this._sprite.draw(this._ctx, {
            position: {
              xPosition: this._position.xPosition,
              yPosition: this._position.yPosition
            },
            scale: this._scale
          })
        }
        break

      case Player.EXPLODING:
        if (this._explosion) {
          this._explosion.draw(this._ctx, this._position.xPosition, this._position.yPosition)
        }
        break

      default:
        break
    }
  }
}

export default Player
