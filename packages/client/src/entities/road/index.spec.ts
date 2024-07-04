import { Acceleration, Speed } from '@/entities/types/types'

import Road from '.'
import SpriteImage from '../sprite-image'

jest.mock('../sprite-image')

describe('Class Road', () => {
  let mockCtx: CanvasRenderingContext2D
  let road: Road

  const initialSpeed: Speed = { xSpeed: 0, ySpeed: 0 }
  const initialAcceleration: Acceleration = { xAcceleration: 0, yAcceleration: 0 }

  beforeEach(() => {
    mockCtx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
    road = new Road(mockCtx, {})

    SpriteImage.prototype.draw = jest.fn()
  })

  it('инициализация с правильными значениями по умолчанию', () => {
    expect(road.speed).toEqual(initialSpeed)
    expect(road.acceleration).toEqual(initialAcceleration)
    expect(road.totalSeconds).toBe(0)
    expect(road.nextRoadSpeed).toBe(0)
  })

  it('правильное устанавление и получение скорость', () => {
    const newSpeed: Speed = { xSpeed: 1, ySpeed: 1 }
    road.setSpeed(newSpeed)
    expect(road.speed).toEqual(newSpeed)
  })

  it('правильноe устанавление и получение ускорения', () => {
    const newAcceleration: Acceleration = { xAcceleration: 1, yAcceleration: 1 }
    road.setAcceleration(newAcceleration)
    expect(road.acceleration).toEqual(newAcceleration)
  })
})
