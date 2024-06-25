import { ImageDictionary, InputStates, RoadLimit } from '@/entities/types/types'

import Timer from './utils/Timer'
import Road from '../road'
import Load from './utils/Load'

import road from '../images/road.png'

export const TIME_BETWEEN_LEVELS = 5000

export const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
}

export const INITIAL_SPEED = {
  ROAD: 0.4
}

class Game {
  public inputStates: InputStates

  public currentGameState: number

  public currentLevel: number

  public currentLevelTime: number

  public canvas: HTMLCanvasElement | null = null

  public ctx: CanvasRenderingContext2D | null = null

  public road: Road | null = null

  public roadLimitLeft: RoadLimit | null = null

  public roadLimitRight: RoadLimit | null = null

  public nextRoadSpeed = 0

  constructor() {
    this.inputStates = {}
    this.currentGameState = GAME_STATE.RUNNING
    this.currentLevel = 0
    this.currentLevelTime = TIME_BETWEEN_LEVELS
  }

  async loadAssets(callback: (images: ImageDictionary) => void): Promise<void> {
    try {
      const images = await Load.images(road)
      callback(images)
    } catch (error) {
      console.error('Ошибка загрузки ассетов:', error)
    }
  }

  start(canvasElement: HTMLCanvasElement): void {
    try {
      this.canvas = canvasElement
      this.ctx = this.canvas.getContext('2d')
      if (!this.ctx) throw new Error('Не удалось получить контекст холста')

      this.ctx.font = '22px Arial'
      this.road = new Road(this.ctx, this.inputStates)

      this.roadLimitLeft = {
        height: this.canvas.height,
        width: 1,
        position: {
          xPosition: 90,
          yPosition: 0
        }
      }

      this.roadLimitRight = {
        height: this.canvas.height,
        width: 1,
        position: {
          xPosition: this.canvas.width - 90,
          yPosition: 0
        }
      }

      this.loadAssets(images => {
        if (this.road) {
          const spriteConfig = { x: 0, y: 0, width: 840, height: 647 }

          this.road.setImage(images[road], spriteConfig)
          this.resetEntities()

          requestAnimationFrame(this.mainLoop.bind(this))
        }
      })
    } catch (error) {
      console.error('Ошибка при запуске игры:', error)
    }
  }

  resetEntities() {
    if (this.road) {
      this.road.speed.ySpeed = INITIAL_SPEED.ROAD
      this.road.acceleration.yAcceleration = 0
    }
  }

  clearCanvas() {
    if (this.canvas && this.ctx) {
      const { width, height } = this.canvas
      this.ctx.clearRect(0, 0, width, height)
    }
  }

  running(deltaTime: number) {
    try {
      this.clearCanvas()

      if (this.road) {
        if (this.nextRoadSpeed < this.road.speed.ySpeed) {
          this.road.acceleration.yAcceleration = 0
        }

        this.road.update(deltaTime)
        this.displayScore()
        this.currentLevelTime -= deltaTime
      }
    } catch (error) {
      console.error('Ошибка во время выполнения игры:', error)
      this.currentGameState = GAME_STATE.GAME_OVER
    }
  }

  gameOver() {
    if (this.ctx) {
      const padding = 100
      const textOffset = 150
      const lineHeight = 50

      const { width: canvasWidth, height: canvasHeight } = this.ctx.canvas
      this.ctx.save()
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      this.ctx.fillRect(padding, 50, canvasWidth - padding * 2, canvasHeight - padding)
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('GAME OVER', canvasWidth / 2 - textOffset, padding + lineHeight)
      this.ctx.fillText('Press SPACE to start again', canvasWidth / 2 - textOffset, padding + lineHeight * 2)
      this.ctx.fillText('Move with arrow keys', canvasWidth / 2 - textOffset, padding + lineHeight * 3)
      this.ctx.fillText(
        `Survive ${TIME_BETWEEN_LEVELS / 1000} seconds for next level`,
        canvasWidth / 2 - textOffset,
        padding + lineHeight * 4
      )
      this.ctx.restore()
    }
  }

  mainLoop(time: number) {
    try {
      const deltaTime = Timer.getDelta(time)

      switch (this.currentGameState) {
        case GAME_STATE.RUNNING:
          this.running(deltaTime)

          if (this.currentLevelTime < 0) {
            this.goToNextLevel()
          }

          break
        case GAME_STATE.MAIN_MENU:
          // TO DO !
          break
        case GAME_STATE.GAME_OVER:
          this.gameOver()
          if (this.inputStates.space) this.startNewGame()
          break
        default:
          break
      }

      requestAnimationFrame(this.mainLoop.bind(this))
    } catch (error) {
      console.error('Ошибка в основном цикле игры:', error)
      this.currentGameState = GAME_STATE.GAME_OVER
    }
  }

  goToNextLevel() {
    this.currentLevelTime = TIME_BETWEEN_LEVELS
    this.currentLevel++

    const difficult = 1.2

    if (this.road) {
      this.nextRoadSpeed = this.road.speed.ySpeed * difficult
      this.road.acceleration.yAcceleration = 0.00001
    }
  }

  startNewGame() {
    this.currentLevelTime = TIME_BETWEEN_LEVELS
    this.currentLevel = 1
    this.currentGameState = GAME_STATE.RUNNING
    this.nextRoadSpeed = INITIAL_SPEED.ROAD
    this.resetEntities()
  }

  displayScore() {
    if (this.ctx) {
      const { currentLevel, currentLevelTime } = this
      this.ctx.save()
      this.ctx.fillStyle = 'White'
      this.ctx.fillText(`Level: ${currentLevel}`, 300, 30)
      this.ctx.fillText(`Time: ${(currentLevelTime / 1000).toFixed(1)}`, 300, 60)
      this.ctx.restore()
    }
  }
}

export default Game
