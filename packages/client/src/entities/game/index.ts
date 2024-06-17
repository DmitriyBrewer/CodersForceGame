import { ImageDictionary, InputStates } from '@/entities/types/types'
import InputHandler from '@/entities/input-handler'
import Player from '@/entities/player'
import Vehicle from '@/entities/vehicle'
import Road from '@/entities/road'

import Collision, { Entity } from '@/entities/game/utils/Сollision'

import Timer from './utils/Timer'
import Load from './utils/Load'

import road from '../images/road.png'
import player from '../images/player.png'
import truck from '../images/truck.png'
import taxi from '../images/taxi.png'
import car from '../images/car.png'
import explosion from '../images/explosion.png'

const TIME_BETWEEN_LEVELS = 5000

const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
}

const INITIAL_SPEED = {
  TRUCK: 0.15,
  CAR: 0.12,
  TAXI: 0.14,
  ROAD: 0.4
}

class Game {
  private readonly _inputStates: InputStates

  private _currentGameState: number

  private _currentLevel: number

  private _currentLevelTime: number

  private _canvas: HTMLCanvasElement | null = null

  private _ctx: CanvasRenderingContext2D | null = null

  private _road!: Road

  private _player!: Player

  private _truck!: Vehicle

  private _taxi!: Vehicle

  private _car!: Vehicle

  private _roadLimitLeft!: Entity

  private _roadLimitRight!: Entity

  private _nextRoadSpeed = 0

  constructor() {
    this._inputStates = {}
    this._currentGameState = GAME_STATE.RUNNING
    this._currentLevel = 1
    this._currentLevelTime = TIME_BETWEEN_LEVELS
  }

  static checkCollision(entity1: Entity, entity2: Entity) {
    if (!entity1) return

    if (Collision.collision(entity1, entity2, 20)) {
      if (Collision.collision(entity1, entity2)) {
        if (entity1.moveToStartPosition) entity1.moveToStartPosition()
      } else if (entity1.speed && entity2.speed) entity1.speed = { ...entity2.speed }
    }
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
      this._canvas = canvasElement
      this._ctx = this._canvas.getContext('2d')
      if (!this._ctx) throw new Error('Не удалось получить контекст холста')

      this._ctx.font = '22px Arial'

      InputHandler.listen(this._inputStates)

      this._road = new Road(this._ctx, this._inputStates)
      this._player = new Player(this._ctx, this._inputStates)
      this._truck = new Vehicle(this._ctx)
      this._taxi = new Vehicle(this._ctx)
      this._car = new Vehicle(this._ctx)
      this._roadLimitLeft = {
        height: this._canvas.height,
        width: 1,
        position: {
          xPosition: 90,
          yPosition: 0
        }
      }
      this._roadLimitRight = {
        height: this._canvas.height,
        width: 1,
        position: {
          xPosition: this._canvas.width - 90,
          yPosition: 0
        }
      }

      this.loadAssets(images => {
        this._truck.setImage(images[truck], {
          position: { xPosition: 78, yPosition: 24 },
          width: 96,
          height: 216
        })
        this._road.setImage(images[road], {
          position: { xPosition: 0, yPosition: 0 },
          width: 840,
          height: 647
        })

        this._player.setImage(images[player], {
          position: { xPosition: 78, yPosition: 24 },
          width: 96,
          height: 216
        })
        this._player.setExplosion(images[explosion])

        this._car.setImage(images[car], {
          position: { xPosition: 78, yPosition: 24 },
          width: 96,
          height: 216
        })
        this._car.setScale(0.79)

        this._taxi.setImage(images[taxi], {
          position: { xPosition: 72, yPosition: 18 },
          width: 102,
          height: 220
        })
        this._taxi.setScale(0.68)

        this.resetEntities()

        requestAnimationFrame(this.mainLoop.bind(this))
      })
    } catch (error) {
      console.error('Ошибка при запуске игры:', error)
    }
  }

  resetEntities() {
    this._player.moveToStartPosition()
    this._taxi.moveToStartPosition(200)
    this._truck.moveToStartPosition(450)
    this._car.moveToStartPosition(700)

    this._road.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD })
    this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })

    this._truck.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.TRUCK })
    this._taxi.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.TAXI })
    this._car.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.CAR })

    this._player.setState(Player.RUNNING)
  }

  clearCanvas() {
    if (this._canvas && this._ctx) {
      const { width, height } = this._canvas
      this._ctx.clearRect(0, 0, width, height)
    }
  }

  running(deltaTime: number) {
    try {
      this.clearCanvas()

      if (this._nextRoadSpeed < this._road.speed.ySpeed) {
        this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })
      }

      this._road.update(deltaTime)
      this._player.update(deltaTime)
      this._truck.update(deltaTime)
      this._taxi.update(deltaTime)
      this._car.update(deltaTime)

      this.displayScore()
      this._currentLevelTime -= deltaTime

      if (this._player.checkCollision(this._truck, this._taxi, this._car, this._roadLimitLeft, this._roadLimitRight)) {
        this._player.setState(Player.EXPLODING)
        setTimeout(() => (this._currentGameState = GAME_STATE.GAME_OVER), 1000)
      }

      Game.checkCollision(this._car, this._truck)
      Game.checkCollision(this._car, this._taxi)
      Game.checkCollision(this._taxi, this._truck)
    } catch (error) {
      console.error('Ошибка во время выполнения игры:', error)
      this._currentGameState = GAME_STATE.GAME_OVER
    }
  }

  gameOver() {
    if (this._ctx) {
      const padding = 100
      const textOffset = 150
      const lineHeight = 50

      const { width: canvasWidth, height: canvasHeight } = this._ctx.canvas
      this._ctx.save()
      this._ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      this._ctx.fillRect(padding, 50, canvasWidth - padding * 2, canvasHeight - padding)
      this._ctx.fillStyle = 'white'
      this._ctx.fillText('GAME OVER', canvasWidth / 2 - textOffset, padding + lineHeight)
      this._ctx.fillText('Press SPACE to start again', canvasWidth / 2 - textOffset, padding + lineHeight * 2)
      this._ctx.fillText('Move with arrow keys', canvasWidth / 2 - textOffset, padding + lineHeight * 3)
      this._ctx.fillText(
        `Survive ${TIME_BETWEEN_LEVELS / 1000} seconds for next level`,
        canvasWidth / 2 - textOffset,
        padding + lineHeight * 4
      )
      this._ctx.restore()
    }
  }

  mainLoop(time: number) {
    try {
      const deltaTime = Timer.getDelta(time)

      switch (this._currentGameState) {
        case GAME_STATE.RUNNING:
          this.running(deltaTime)

          if (this._currentLevelTime < 0) {
            this.goToNextLevel()
          }

          break
        case GAME_STATE.MAIN_MENU:
          // TO DO !
          break
        case GAME_STATE.GAME_OVER:
          this.gameOver()
          if (this._inputStates.space) this.startNewGame()
          break
        default:
          break
      }

      requestAnimationFrame(this.mainLoop.bind(this))
    } catch (error) {
      console.error('Ошибка в основном цикле игры:', error)
      this._currentGameState = GAME_STATE.GAME_OVER
    }
  }

  goToNextLevel() {
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this._currentLevel++

    const difficult = 1.2

    if (this._road) {
      this._nextRoadSpeed = this._road.speed.ySpeed * difficult
      this._road.acceleration.yAcceleration = 0.00001
    }
  }

  startNewGame() {
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this._currentLevel = 1
    this._currentGameState = GAME_STATE.RUNNING
    this._nextRoadSpeed = INITIAL_SPEED.ROAD
    this.resetEntities()
  }

  displayScore() {
    if (this._ctx) {
      const { _currentLevel, _currentLevelTime } = this
      this._ctx.save()
      this._ctx.fillStyle = 'White'
      this._ctx.fillText(`Level: ${_currentLevel}`, 300, 30)
      this._ctx.fillText(`Time: ${(_currentLevelTime / 1000).toFixed(1)}`, 300, 60)
      this._ctx.restore()
    }
  }
}

export default Game
