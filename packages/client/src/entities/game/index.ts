import { ImageDictionary, InputStates } from '@/entities/types/types'
import InputHandler from '@/entities/game/utils/InputHandler'
import Collision, { Entity } from '@/entities/game/utils/Сollision'
import Timer from '@/entities/game/utils/Timer'
import Load from '@/entities/game/utils/Load'
import Player from '@/entities/player'
import Vehicle from '@/entities/vehicle'
import Road from '@/entities/road'

import roadImage from '../images/road.png'
import playerImage from '../images/player.png'
import taxiImage from '../images/taxi.png'
import carImage from '../images/car.png'
import policeImage from '../images/police.png'
import ambulanceImage from '../images/ambulance.png'
import explosionImage from '../images/explosion.png'

const TIME_BETWEEN_LEVELS = 5000
const INITIAL_SPEED = {
  VEHICLE: 0.21,
  ROAD: 0.3
}
const GAME_STATE = {
  RUNNING: 1,
  GAME_OVER: 2
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

  private _vehicles: Vehicle[] = []

  private _roadLimits: Entity[] = []

  private _nextRoadSpeed = 0

  private readonly _endGameCallback: () => void

  constructor(endGameCallback: () => void) {
    this._inputStates = {}
    this._currentGameState = GAME_STATE.RUNNING
    this._currentLevel = 1
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this._endGameCallback = endGameCallback
  }

  get currentGameState() {
    return this._currentGameState
  }

  async loadAssets(callback: (images: ImageDictionary) => void): Promise<void> {
    const imagePaths = [roadImage, playerImage, taxiImage, carImage, explosionImage, policeImage, ambulanceImage]

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

    const road = new Road(this._ctx, this._inputStates)
    const player = new Player(this._ctx, this._inputStates)
    const police = new Vehicle(this._ctx)
    const taxi = new Vehicle(this._ctx)
    const car = new Vehicle(this._ctx)
    // const ambulance = new Vehicle(this._ctx)
    const roadLimitLeft = {
      height: this._canvas.height,
      width: 1,
      position: { xPosition: 120, yPosition: 0 }
    }
    const roadLimitRight = {
      height: this._canvas.height,
      width: 1,
      position: { xPosition: this._canvas.width - 110, yPosition: 0 }
    }

    this._road = road
    this._player = player
    this._vehicles = [police, taxi, car]
    this._roadLimits = [roadLimitLeft, roadLimitRight]
    this.loadAssets(images => {
      this._player.setImage(images[playerImage], {
        position: { xPosition: 78, yPosition: 24 },
        width: 110,
        height: 200
      })
      this._player.setExplosion(images[explosionImage])

      this._road.setImage(images[roadImage], { position: { xPosition: 0, yPosition: 0 }, width: 840, height: 647 })

      const vehicleImages = [images[policeImage], images[carImage], images[taxiImage], images[ambulanceImage]]
      const vehiclePositions = [78, 78, 72]
      const vehicleScales = [0.79, 0.79, 0.79]

      this._vehicles.forEach((vehicle, index) => {
        vehicle.setImage(vehicleImages[index], {
          position: { xPosition: vehiclePositions[index], yPosition: 24 },
          width: 110,
          height: 200
        })
        vehicle.setScale(vehicleScales[index])
      })

      this.resetEntities()
      this._currentGameState = GAME_STATE.RUNNING
      requestAnimationFrame(this.mainLoop.bind(this))
    })
  }

  resetEntities() {
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this._currentLevel = 1
    this._currentGameState = GAME_STATE.RUNNING
    this._nextRoadSpeed = INITIAL_SPEED.ROAD

    this._vehicles.forEach((vehicle, index) => vehicle.moveToStartPosition(400 + index * 400))
    this._vehicles.forEach(vehicle => {
      vehicle.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.VEHICLE })
    })

    this._road.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD })
    this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })

    this._player.moveToStartPosition()
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
    this._vehicles.forEach(vehicle => vehicle.update(deltaTime))
    this._currentLevelTime -= deltaTime

    this.displayScore()
    this.checkGameOver()

    this._vehicles.forEach((vehicle, index) => {
      for (let i = index + 1; i < this._vehicles.length; i++) {
        Collision.checkCollision(vehicle, this._vehicles[i])
      }
    })
  }

  mainLoop(time: number) {
    const deltaTime = Timer.getDelta(time)

    switch (this.currentGameState) {
      case GAME_STATE.RUNNING:
        this.running(deltaTime)
        this.goToNextLevel()
        requestAnimationFrame(this.mainLoop.bind(this))
        break
      case GAME_STATE.GAME_OVER:
        this._endGameCallback()
        break
      default:
        break
    }
  }

  goToNextLevel() {
    if (this._currentLevelTime < 0) {
      this._currentLevelTime = TIME_BETWEEN_LEVELS
      this._currentLevel++

      const difficult = 1.1

      if (this._road.speed.ySpeed < INITIAL_SPEED.ROAD * 5) {
        this._road.setAcceleration({ xAcceleration: 0, yAcceleration: this._road.acceleration.yAcceleration + 0.05 })
        this._road.setSpeed({ xSpeed: 0, ySpeed: this._road.speed.ySpeed * difficult })
        this._nextRoadSpeed = this._road.speed.ySpeed
      }

      this._vehicles.forEach(vehicle => {
        vehicle.setAcceleration({ xAcceleration: 0, yAcceleration: vehicle.acceleration.yAcceleration + 0.05 })
        vehicle.setSpeed({ xSpeed: 0, ySpeed: vehicle.speed.ySpeed * difficult })
      })
    }
  }

  displayScore() {
    if (this._ctx) {
      const { _currentLevel, _currentLevelTime } = this
      this._ctx.save()
      this._ctx.font = 'bold 36px Arial'
      this._ctx.fillStyle = 'White'
      this._ctx.strokeStyle = 'Purple'
      this._ctx.lineWidth = 1
      this._ctx.fillText(`Level: ${_currentLevel}`, 55, 35)
      this._ctx.strokeText(`Level: ${_currentLevel}`, 55, 35)
      this._ctx.fillText(`Time: ${(_currentLevelTime / 1000).toFixed(1)}`, 55, 70)
      this._ctx.strokeText(`Time: ${(_currentLevelTime / 1000).toFixed(1)}`, 55, 70)
      this._ctx.restore()
    }
  }

  checkGameOver() {
    if (this._player.checkCollision(...this._vehicles, ...this._roadLimits)) {
      this._player.setState(Player.EXPLODING)
      setTimeout(() => {
        this._currentGameState = GAME_STATE.GAME_OVER
      }, 600)
    }
  }
}

export default Game
