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
import taxi from '../images/taxi.png'
import car from '../images/car.png'
import police from '../images/police.png'
import ambulance from '../images/ambulance.png'
import explosion from '../images/explosion.png'

const TIME_BETWEEN_LEVELS = 5000

export const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
}

const INITIAL_SPEED = {
  POLICE: 0.15,
  CAR: 0.21,
  TAXI: 0.11,
  ROAD: 0.4,
  AMBULANCE: 0.09
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

  private _taxi!: Vehicle

  private _car!: Vehicle

  private _police!: Vehicle

  private _ambulance!: Vehicle

  private _roadLimitLeft!: Entity

  private _roadLimitRight!: Entity

  private _nextRoadSpeed = 0

  private _requestIdRef?: number

  constructor() {
    this._inputStates = {}
    this._currentGameState = GAME_STATE.RUNNING
    this._currentLevel = 0
    this._currentLevelTime = TIME_BETWEEN_LEVELS
  }

  get currentGameState() {
    return this._currentGameState
  }

  static checkCollision(entity1: Entity, entity2: Entity) {
    if (Collision.collision(entity1, entity2, 20)) {
      if (Collision.collision(entity1, entity2)) {
        if (entity1 && entity1.moveToStartPosition) {
          entity1.moveToStartPosition()
        }
      } else if (entity1 && entity1.setSpeed && entity2 && entity2.speed) {
        entity1.setSpeed({ xSpeed: entity2.speed.xSpeed, ySpeed: entity2.speed.ySpeed })
      }
    }
  }

  async loadAssets(callback: (images: ImageDictionary) => void): Promise<void> {
    const imagePaths = [road, player, taxi, car, explosion, police, ambulance]

    try {
      const images = await Load.images(...imagePaths)
      callback(images)
    } catch (error) {
      console.error('Ошибка загрузки ассетов:', error)
    }
  }

  start(canvasElement: HTMLCanvasElement): void {
    this._canvas = canvasElement
    this._ctx = this._canvas.getContext('2d')
    if (!this._ctx) throw new Error('Не удалось получить контекст холста')

    this._ctx.font = '22px Arial'

    InputHandler.listen(this._inputStates)

    this._road = new Road(this._ctx, this._inputStates)
    this._player = new Player(this._ctx, this._inputStates)
    this._police = new Vehicle(this._ctx)
    this._taxi = new Vehicle(this._ctx)
    this._car = new Vehicle(this._ctx)
    this._ambulance = new Vehicle(this._ctx)
    this._roadLimitLeft = {
      height: this._canvas.height,
      width: 1,
      position: {
        xPosition: 120,
        yPosition: 0
      }
    }
    this._roadLimitRight = {
      height: this._canvas.height,
      width: 1,
      position: {
        xPosition: this._canvas.width - 110,
        yPosition: 0
      }
    }

    this.loadAssets(images => {
      this._player.setImage(images[player], {
        position: { xPosition: 78, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._player.setExplosion(images[explosion])

      this._road.setImage(images[road], {
        position: { xPosition: 0, yPosition: 0 },
        width: 840,
        height: 647
      })

      this._police.setImage(images[police], {
        position: { xPosition: 78, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._car.setScale(0.79)

      this._car.setImage(images[car], {
        position: { xPosition: 78, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._car.setScale(0.79)

      this._taxi.setImage(images[taxi], {
        position: { xPosition: 72, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._taxi.setScale(0.79)

      this._ambulance.setImage(images[ambulance], {
        position: { xPosition: 72, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._ambulance.setScale(0.9)

      this.resetEntities()
      this._currentGameState = GAME_STATE.RUNNING

      this._requestIdRef = requestAnimationFrame(this.mainLoop.bind(this))
    })
  }

  resetEntities() {
    this._player.moveToStartPosition()
    this._taxi.moveToStartPosition(650)
    this._police.moveToStartPosition(450)
    this._car.moveToStartPosition(700)
    this._ambulance.moveToStartPosition(400)

    this._road.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD })
    this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })

    this._police.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.POLICE })
    this._taxi.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.TAXI })
    this._car.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.CAR })
    this._ambulance.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.AMBULANCE })

    this._player.setState(Player.RUNNING)
  }

  clearCanvas() {
    if (this._canvas && this._ctx) {
      const { width, height } = this._canvas
      this._ctx.clearRect(0, 0, width, height)
    }
  }

  running(deltaTime: number) {
    this.clearCanvas()

    this._currentGameState = GAME_STATE.RUNNING

    if (this._nextRoadSpeed < this._road.speed.ySpeed) {
      this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })
    }

    this._road.update(deltaTime)
    this._player.update(deltaTime)
    this._police.update(deltaTime)
    this._taxi.update(deltaTime)
    this._car.update(deltaTime)
    this._ambulance.update(deltaTime)
    this._currentLevelTime -= deltaTime

    this.displayScore()
    this.gameOver()

    Game.checkCollision(this._car, this._police)
    Game.checkCollision(this._car, this._taxi)
    Game.checkCollision(this._car, this._ambulance)
    Game.checkCollision(this._taxi, this._ambulance)
    Game.checkCollision(this._ambulance, this._police)
    Game.checkCollision(this._taxi, this._police)
  }

  mainLoop(time: number) {
    const dt = Timer.getDelta(time)

    switch (this.currentGameState) {
      case GAME_STATE.RUNNING:
        this.running(dt)
        this.goToNextLevel()
        break
      case GAME_STATE.GAME_OVER:
        if (this._inputStates.space) this.startNewGame()
        break
      default:
        break
    }

    requestAnimationFrame(this.mainLoop.bind(this))
  }

  goToNextLevel() {
    if (this._currentLevelTime < 0) {
      this._currentLevelTime = TIME_BETWEEN_LEVELS
      this._currentLevel++

      const difficult = 1.2

      if (this._road) {
        this._nextRoadSpeed = this._road.speed.ySpeed * difficult
        this._road.acceleration.yAcceleration = 0.00001
      }
    }
  }

  gameOver() {
    if (
      this._player.checkCollision(
        this._police,
        this._taxi,
        this._car,
        this._ambulance,
        this._roadLimitLeft,
        this._roadLimitRight
      )
    ) {
      this._player.setState(Player.EXPLODING)
      setTimeout(() => (this._currentGameState = GAME_STATE.GAME_OVER), 1000)
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
      this._ctx.fillText(`Level: ${_currentLevel}`, 355, 30)
      this._ctx.fillText(`Time: ${(_currentLevelTime / 1000).toFixed(1)}`, 350, 60)
      this._ctx.restore()
    }
  }
}

export default Game
