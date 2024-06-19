import { SpriteConfig } from '@/entities/types/types'

class SpriteImage {
  private _image: HTMLImageElement

  private _spriteConfig: SpriteConfig

  constructor(image: HTMLImageElement, spriteConfig: SpriteConfig) {
    this._image = image
    this._spriteConfig = spriteConfig
  }

  get spriteConfig() {
    return this._spriteConfig
  }

  draw(ctx: CanvasRenderingContext2D, options: { position: { xPosition: number; yPosition: number }; scale: number }) {
    const { xPosition, yPosition } = options.position
    const { width, height } = this.spriteConfig
    ctx.drawImage(
      this._image,
      this.spriteConfig.position.xPosition,
      this.spriteConfig.position.yPosition,
      width,
      height,
      xPosition,
      yPosition,
      width * options.scale,
      height * options.scale
    )
  }
}

export default SpriteImage
