class SpriteImage {
  public img: HTMLImageElement

  public x: number

  public y: number

  public width: number

  public height: number

  constructor(img: HTMLImageElement, x: number, y: number, width: number, height: number) {
    this.img = img
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D, xPos: number, yPos: number, scale: number) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
      xPos,
      yPos,
      this.width * scale,
      this.height * scale
    )
  }
}

export default SpriteImage
