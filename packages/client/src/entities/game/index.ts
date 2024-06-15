import { RoadLimit } from '@/entities/types/types'

import Timer from './utils/Timer'
import Road from '../road'
import Load from './utils/Load'

import road from '../images/road.png'

const TIME_BETWEEN_LEVELS = 5000

const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
}

const INITIAL_SPEED = {
  ROAD: 0.4
}

class Game {
  public inputStates: { [key: string]: boolean }

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

  async loadAssets(cb: (images: { [key: string]: HTMLImageElement }) => void) {
    try {
      const images = await Load.images(road)
      cb(images)
    } catch (error) {
      console.error('Ошибка загрузки ассетов:', error)
    }
  }

  start(canvasElement: HTMLCanvasElement) {
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
          this.road.setImage(images[road], 0, 0, 840, 647)
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
      this.road.accel.yAcceleration = 0
    }
  }

  clearCanvas() {
    if (this.canvas && this.ctx) {
      const { width, height } = this.canvas
      this.ctx.clearRect(0, 0, width, height)
    }
  }

  running(dt: number) {
    try {
      this.clearCanvas()

      if (this.road) {
        if (this.nextRoadSpeed < this.road.speed.ySpeed) {
          this.road.accel.yAcceleration = 0
        }

        this.road.update(dt)
        this.displayScore()
        this.currentLevelTime -= dt
      }
    } catch (error) {
      console.error('Ошибка во время выполнения игры:', error)
      this.currentGameState = GAME_STATE.GAME_OVER
    }
  }

  gameOver() {
    if (this.ctx) {
      const pad = 100
      const tOff = 150
      const line = 50

      const { width: cW, height: cH } = this.ctx.canvas
      this.ctx.save()
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      this.ctx.fillRect(pad, 50, cW - pad * 2, cH - pad)
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('GAME OVER', cW / 2 - tOff, pad + line)
      this.ctx.fillText('Press SPACE to start again', cW / 2 - tOff, pad + line * 2)
      this.ctx.fillText('Move with arrow keys', cW / 2 - tOff, pad + line * 3)
      this.ctx.fillText(`Survive ${TIME_BETWEEN_LEVELS / 1000} seconds for next level`, cW / 2 - tOff, pad + line * 4)
      this.ctx.restore()
    }
  }

  mainLoop(time: number) {
    try {
      const dt = Timer.getDelta(time)

      switch (this.currentGameState) {
        case GAME_STATE.RUNNING:
          this.running(dt)

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
      this.road.accel.yAcceleration = 0.00001
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
