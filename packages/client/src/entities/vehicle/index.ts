import { Acceleration, AnimationConfig, Position, Speed, SpriteConfig } from '@/entities/types/types'
import { Entity } from '@/entities/game/utils/Сollision'
import SpriteAnimation from '@/entities/sprite-animation'

import SpriteImage from '../sprite-image'
import Road from '../road'

class Vehicle implements Entity {
  public _ctx: CanvasRenderingContext2D

  private _scale: number

  private _speed: Speed

  private _acceleration: Acceleration

  private _position!: Position

  private _sprite!: SpriteImage

  private _animation!: SpriteAnimation

  private _startOffset!: number

  private _lane!: number

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx
    this._scale = 0.9
    this._speed = {
      xSpeed: 0.002,
      ySpeed: 0.1
    }
    this._acceleration = {
      xAcceleration: 0,
      yAcceleration: 0
    }
  }

  get acceleration() {
    return this._acceleration
  }

  set acceleration(value: Acceleration) {
    this._acceleration = value
  }

  get speed() {
    return this._speed
  }

  set speed(value: Speed) {
    this._speed = value
  }

  get sprite() {
    return this._sprite
  }

  set sprite(value: SpriteImage) {
    this._sprite = value
  }

  setImage(img: HTMLImageElement, spriteConfig: SpriteConfig): void {
    this._sprite = new SpriteImage(img, spriteConfig)
  }

  setAnimation(img: HTMLImageElement, animationConfig: AnimationConfig) {
    this._animation = new SpriteAnimation()
    this._animation.extractSprites(img, animationConfig)
    this._animation.draw(this._ctx, this._position.xPosition, this._position.yPosition)
    this._animation.reset()
  }

  setScale(scale: number): void {
    this._scale = scale
  }

  setSpeed(speed: Speed): void {
    this._speed = speed
  }

  setAcceleration(acceleration: Acceleration): void {
    this._acceleration = acceleration
  }

  get height() {
    return this._sprite.spriteConfig.height
  }

  get width() {
    return this._sprite.spriteConfig.width
  }

  get position(): Position {
    return this._position
  }

  set position(value: Position) {
    this._position = value
  }

  moveToStartPosition(startOffset?: number): void {
    const sOff = startOffset || this._startOffset
    this._lane = Vehicle.getRandomInt(0, Road.LANE_CENTER.length)
    if (this._sprite) {
      const { height: spriteHeight, width: spriteWidth } = this._sprite.spriteConfig
      this._position = {
        xPosition: Road.LANE_CENTER[this._lane] - spriteWidth / 2,
        yPosition: -(spriteHeight + sOff)
      }
    }
    this._startOffset = sOff
  }

  update(deltaTime: number): void {
    if (this._position && this._sprite) {
      const laneX = Road.LANE_CENTER[this._lane]
      const { width: spriteWidth } = this._sprite.spriteConfig

      if (Math.abs(laneX - spriteWidth / 2 - this._position.xPosition) > 20) {
        this._speed.xSpeed = -this._speed.xSpeed
      }

      this._position.xPosition += this._speed.xSpeed * deltaTime
      this._position.yPosition += this._speed.ySpeed * deltaTime
      this._sprite.draw(this._ctx, {
        position: {
          xPosition: this._position.xPosition,
          yPosition: this._position.yPosition
        },
        scale: this._scale
      })

      if (this._position.yPosition > this._ctx.canvas.height) {
        this.moveToStartPosition()
      }
    }
  }

  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
}

export default Vehicle
