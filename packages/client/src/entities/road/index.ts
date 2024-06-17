import { Acceleration, InputStates, Speed, SpriteConfig } from '@/entities/types/types'

import SpriteImage from '../sprite-image'

class Road {
  static LANE_CENTER = [220, 344, 476, 600]

  private readonly _ctx: CanvasRenderingContext2D

  private _inputStates: InputStates

  private _speed: Speed

  private _acceleration: Acceleration

  private _totalSeconds: number

  private _sprite!: SpriteImage

  constructor(ctx: CanvasRenderingContext2D, inputStates: InputStates) {
    this._ctx = ctx
    this._inputStates = inputStates
    this._speed = {
      xSpeed: 0,
      ySpeed: 0
    }
    this._acceleration = {
      xAcceleration: 0,
      yAcceleration: 0
    }
    this._totalSeconds = 0
  }

  setImage(image: HTMLImageElement, spriteConfig: SpriteConfig) {
    this._sprite = new SpriteImage(image, spriteConfig)
  }

  setSpeed(speed: Speed) {
    this._speed = speed
  }

  setAcceleration(acceleration: Acceleration) {
    this._acceleration = acceleration
  }

  get speed() {
    return this._speed
  }

  get acceleration() {
    return this._acceleration
  }

  update(deltaTime: number) {
    const { width: canvasWidth } = this._ctx.canvas
    const { height: spriteHeight, width: spriteWidth } = this._sprite
    this._totalSeconds += deltaTime

    this._speed.ySpeed += this._acceleration.yAcceleration * deltaTime

    const numImages = Math.ceil(canvasWidth / spriteWidth) + 1
    const yPosition = (this._totalSeconds * this._speed.ySpeed) % spriteHeight

    this._ctx.save()
    this._ctx.translate(0, yPosition)
    for (let i = 0; i < numImages; i++) {
      this._sprite.draw(this._ctx, {
        position: {
          xPosition: canvasWidth / 2 - spriteWidth / 2,
          yPosition: -i * spriteHeight
        },
        scale: 1
      })
    }
    this._ctx.restore()
  }
}

export default Road
