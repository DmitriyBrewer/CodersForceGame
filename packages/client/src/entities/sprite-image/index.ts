import { DrawConfig, SpriteConfig } from '@/entities/types/types'

class SpriteImage {
  public image: HTMLImageElement

  public x: number

  public y: number

  public width: number

  public height: number

  constructor(image: HTMLImageElement, config: SpriteConfig) {
    const {
      position: { xPosition: x, yPosition: y },
      width,
      height
    } = config

    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D, drawConfig: DrawConfig) {
    const {
      position: { xPosition, yPosition },
      scale
    } = drawConfig

    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      xPosition,
      yPosition,
      this.width * scale,
      this.height * scale
    )
  }
}

export default SpriteImage
