import { InputStates, SpriteConfig } from '@/entities/types/types'

import Player from '.'
import SpriteImage from '../sprite-image'
import SpriteAnimation from '../sprite-animation'
import Collision from '../game/utils/Сollision'

jest.mock('../sprite-animation')

describe('Class Player', () => {
  let mockCtx: CanvasRenderingContext2D
  let player: Player
  const initialInputStates: InputStates = {}
  const mockImage = new Image()
  const spriteConfig: SpriteConfig = {
    position: { xPosition: 0, yPosition: 0 },
    width: 100,
    height: 100
  }

  beforeEach(() => {
    mockCtx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
    player = new Player(mockCtx, initialInputStates)

    SpriteImage.prototype.draw = jest.fn()
    SpriteAnimation.prototype.extractSprites = jest.fn()
    SpriteAnimation.prototype.draw = jest.fn()
    SpriteAnimation.prototype.reset = jest.fn()
  })

  it('правильное установление и получение изображения', () => {
    player.setImage(mockImage, spriteConfig)
    expect(player.sprite).toBeInstanceOf(SpriteImage)
    expect(player.sprite.spriteConfig).toEqual(spriteConfig)
  })

  it('правильно установление и получение взрыва', () => {
    player.setExplosion(mockImage)
    expect(player.explosion).toBeInstanceOf(SpriteAnimation)
    expect(player.explosion.extractSprites).toHaveBeenCalledWith(mockImage, {
      numberOfPostures: 16,
      numberOfFramesPerPosture: 10,
      width: 64,
      height: 64
    })
  })

  it('правильное перемещение на стартовую позицию', () => {
    player.setImage(mockImage, spriteConfig)
    player.moveToStartPosition()
    const { height: canvasHeight, width: canvasWidth } = mockCtx.canvas
    const { height: spriteHeight, width: spriteWidth } = spriteConfig
    expect(player.position).toEqual({
      xPosition: canvasWidth / 2 - (spriteWidth * player.scale) / 2,
      yPosition: canvasHeight - 16 - spriteHeight * player.scale
    })
  })

  it('правильное переключение состояния и сбрасывания взрыва', () => {
    player.setExplosion(mockImage)
    player.setState(Player.EXPLODING)
    expect(player.state).toBe(Player.EXPLODING)
    expect(player.explosion.reset).toHaveBeenCalled()
  })

  it('правильное обрабатывание столкновения', () => {
    const mockEntity = { position: { xPosition: 0, yPosition: 0 }, width: 50, height: 50 }
    jest.spyOn(Collision, 'collision').mockReturnValue(true)
    expect(player.checkCollision(mockEntity)).toBe(true)
  })

  it('рисование спрайта в состоянии running', () => {
    player.setImage(mockImage, spriteConfig)
    player.update(1000)
    expect(player.sprite.draw).toHaveBeenCalled()
  })

  it('рисование взрыва в состоянии exploding', () => {
    player.setExplosion(mockImage)
    player.setState(Player.EXPLODING)
    player.update(1000)
    expect(player.explosion.draw).toHaveBeenCalled()
  })
})
