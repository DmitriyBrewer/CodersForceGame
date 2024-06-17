import { Acceleration, InputStates, Speed, SpriteConfig } from '@/entities/types/types'

import SpriteImage from '../sprite-image'

class Road {
  static LANE_CENTER = [220, 344, 476, 600]

  public ctx: CanvasRenderingContext2D

  public inputStates: InputStates

  public speed: Speed

  public acceleration: Acceleration

  public totalSeconds: number

  public sprite!: SpriteImage

  constructor(ctx: CanvasRenderingContext2D, inputStates: InputStates) {
    this.ctx = ctx
    this.inputStates = inputStates
    this.speed = {
      xSpeed: 0,
      ySpeed: 0
    }
    this.acceleration = {
      xAcceleration: 0,
      yAcceleration: 0
    }
    this.totalSeconds = 0
  }

  setImage(image: HTMLImageElement, spriteConfig: SpriteConfig) {
    this.sprite = new SpriteImage(image, spriteConfig)
  }

  update(deltaTime: number) {
    const { width: canvasWidth } = this.ctx.canvas
    const { height: spriteHeight, width: spriteWidth } = this.sprite
    this.totalSeconds += deltaTime

    this.speed.ySpeed += this.acceleration.yAcceleration * deltaTime

    const numImages = Math.ceil(canvasWidth / spriteWidth) + 1
    const yPosition = (this.totalSeconds * this.speed.ySpeed) % spriteHeight

    this.ctx.save()
    this.ctx.translate(0, yPosition)
    for (let i = 0; i < numImages; i++) {
      const drawConfig = {
        xPosition: canvasWidth / 2 - spriteWidth / 2,
        yPosition: -i * spriteHeight,
        scale: 1
      }
      this.sprite.draw(this.ctx, drawConfig)
    }
    this.ctx.restore()
  }
}

export default Road
