import { AnimationConfig } from '@/entities/types/types'

import SpriteImage from '../sprite-image'

class SpriteAnimation {
  public spriteArray: SpriteImage[]

  public currentFrame: number

  public delayBetweenFrames: number

  public then: number

  public totalTimeSinceLastRedraw: number

  constructor() {
    this.spriteArray = []
    this.currentFrame = 0
    this.delayBetweenFrames = 10 // default to 10 fps
    this.then = performance.now()
    this.totalTimeSinceLastRedraw = 0
  }

  extractSprites(spriteSheet: HTMLImageElement, animationConfig: AnimationConfig): void {
    const numberOfSprites = animationConfig.numberOfPostures * animationConfig.numberOfFramesPerPosture
    const numberOfSpritesPerRow = Math.floor(spriteSheet.width / animationConfig.width)

    for (let index = 0; index < numberOfSprites; index++) {
      const xPosition = (index % numberOfSpritesPerRow) * animationConfig.width
      const yPosition = Math.floor(index / numberOfSpritesPerRow) * animationConfig.height
      const spriteImage = new SpriteImage(spriteSheet, {
        position: {
          xPosition,
          yPosition
        },
        width: animationConfig.width,
        height: animationConfig.height
      })

      this.spriteArray.push(spriteImage)
    }
  }

  draw(ctx: CanvasRenderingContext2D, xPosition: number, yPosition: number): void {
    const now = performance.now()
    const delta = now - this.then

    if (this.spriteArray.length > 0) {
      const currentSpriteImage = this.spriteArray[this.currentFrame]
      currentSpriteImage.draw(ctx, {
        position: {
          xPosition,
          yPosition
        },
        scale: 1
      })
    }

    if (this.totalTimeSinceLastRedraw > this.delayBetweenFrames) {
      this.currentFrame = (this.currentFrame + 1) % this.spriteArray.length
      this.totalTimeSinceLastRedraw = 0
    } else {
      this.totalTimeSinceLastRedraw += delta
    }

    this.then = now
  }

  setNumberOfImagesPerSecond(numberOfImagesPerSecond: number): void {
    this.delayBetweenFrames = 1000 / numberOfImagesPerSecond
  }

  reset(): void {
    this.currentFrame = 0
  }
}

export default SpriteAnimation
