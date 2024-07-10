import { Acceleration, Speed, Position, SpriteConfig } from '@/entities/types/types'

import Vehicle from '.'
import SpriteImage from '../sprite-image'
import SpriteAnimation from '../sprite-animation'

jest.mock('../sprite-animation')

describe('Class Vehicle', () => {
  let mockCtx: CanvasRenderingContext2D
  let vehicle: Vehicle

  const initialSpeed: Speed = { xSpeed: 0.002, ySpeed: 0.1 }
  const initialAcceleration: Acceleration = { xAcceleration: 0, yAcceleration: 0 }
  const mockImage = new Image()
  const spriteConfig: SpriteConfig = {
    position: { xPosition: 0, yPosition: 0 },
    width: 100,
    height: 100
  }

  beforeEach(() => {
    mockCtx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
    vehicle = new Vehicle(mockCtx)

    SpriteImage.prototype.draw = jest.fn()
    SpriteAnimation.prototype.extractSprites = jest.fn()
    SpriteAnimation.prototype.draw = jest.fn()
    SpriteAnimation.prototype.reset = jest.fn()
  })

  it('инициализиция с правильными значениями по умолчанию', () => {
    expect(vehicle.speed).toEqual(initialSpeed)
    expect(vehicle.acceleration).toEqual(initialAcceleration)
  })

  it('правильноt устанавливление и получение скорости', () => {
    const newSpeed: Speed = { xSpeed: 1, ySpeed: 1 }
    vehicle.setSpeed(newSpeed)
    expect(vehicle.speed).toEqual(newSpeed)
  })

  it('правильное устанавление и получение ускорения', () => {
    const newAcceleration: Acceleration = { xAcceleration: 1, yAcceleration: 1 }
    vehicle.setAcceleration(newAcceleration)
    expect(vehicle.acceleration).toEqual(newAcceleration)
  })

  it('правильное установление и получение изображения', () => {
    vehicle.setImage(mockImage, spriteConfig)
    expect(vehicle.sprite).toBeInstanceOf(SpriteImage)
    expect(vehicle.sprite.spriteConfig).toEqual(spriteConfig)
  })

  it('правильное устанавление и получение позиции', () => {
    const position: Position = { xPosition: 10, yPosition: 10 }
    vehicle.position = position
    expect(vehicle.position).toEqual(position)
  })

  it('правильное перемещение на стартовую позицию', () => {
    vehicle.setImage(mockImage, spriteConfig)
    vehicle.moveToStartPosition(100)
    expect(vehicle.position).toBeDefined()
    expect(vehicle.position.yPosition).toBeLessThan(0)
  })

  it('правильное обновление позиции', () => {
    vehicle.setImage(mockImage, spriteConfig)
    vehicle.position = { xPosition: 0, yPosition: 0 }
    vehicle.update(1000)
    expect(vehicle.position.yPosition).toBeGreaterThan(0)
  })
})
