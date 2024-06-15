import { Acceleration, InputStates, Speed } from '@/entities/types/types'

import SpriteImage from '../sprite-image'

class Road {
  static LANE_CENTER = [220, 344, 476, 600]

  public ctx: CanvasRenderingContext2D

  public inputStates: InputStates

  public speed: Speed

  public accel: Acceleration

  public totalSeconds: number

  public sprite!: SpriteImage

  constructor(ctx: CanvasRenderingContext2D, inputStates: InputStates) {
    this.ctx = ctx
    this.inputStates = inputStates
    this.speed = {
      xSpeed: 0,
      ySpeed: 0
    }

    this.accel = {
      xAcceleration: 0,
      yAcceleration: 0
    }

    this.totalSeconds = 0
  }

  setImage(img: HTMLImageElement, ...args: [number, number, number, number]) {
    this.sprite = new SpriteImage(img, ...args)
  }

  update(dt: number) {
    const { width: cW } = this.ctx.canvas
    const { height: sH, width: sW } = this.sprite
    this.totalSeconds += dt

    this.speed.ySpeed += this.accel.yAcceleration * dt

    const numImages = Math.ceil(cW / sW) + 1
    const yPos = (this.totalSeconds * this.speed.ySpeed) % sH

    this.ctx.save()
    this.ctx.translate(0, yPos)
    for (let i = 0; i < numImages; i++) {
      this.sprite.draw(this.ctx, cW / 2 - sW / 2, -i * sH, 1)
    }
    this.ctx.restore()
  }
}

export default Road
