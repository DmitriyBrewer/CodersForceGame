/* eslint-disable react-hooks/rules-of-hooks */
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
import { ScoreData } from '@/feature/leaderbord/hooks/useLeaderboard'

export const TIME_BETWEEN_LEVELS = 5000
export const INITIAL_SPEED = {
  VEHICLE: 0.21,
  ROAD: 0.3
}
export const GAME_STATE = {
  RUNNING: 1,
  GAME_OVER: 2
}
const FPS_UPDATE_INTERVAL = 100

class Game {
  private _inputStates: InputStates

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

  private _lastFrameTime = 0

  private _fps = 0

  private _lastFpsUpdateTime = 0

  private _frameCount = 0

  private submitScore: (scoreData: ScoreData) => Promise<void>

  private name: string

  constructor(submitScore: (scoreData: ScoreData) => Promise<void>, name = 'megaImya') {
    this._inputStates = {}
    this._currentGameState = GAME_STATE.RUNNING
    this._currentLevel = 1
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this.submitScore = submitScore
    this.name = name
  }

  get currentGameState() {
    return this._currentGameState
  }

  set currentGameState(value: number) {
    this._currentGameState = value
  }

  get currentLevel() {
    return this._currentLevel
  }

  set currentLevel(value: number) {
    this._currentLevel = value
  }

  get currentLevelTime() {
    return this._currentLevelTime
  }

  set currentLevelTime(value: number) {
    this._currentLevelTime = value
  }

  get inputStates() {
    return this._inputStates
  }

  get canvas() {
    return this._canvas
  }

  set canvas(value: HTMLCanvasElement | null) {
    this._canvas = value
  }

  get ctx() {
    return this._ctx
  }

  set ctx(value: CanvasRenderingContext2D | null) {
    this._ctx = value
  }

  get road() {
    return this._road
  }

  set road(value: Road) {
    this._road = value
  }

  get player() {
    return this._player
  }

  set player(value: Player) {
    this._player = value
  }

  get vehicles() {
    return this._vehicles
  }

  set vehicles(value: Vehicle[]) {
    this._vehicles = value
  }

  get nextRoadSpeed() {
    return this._nextRoadSpeed
  }

  set nextRoadSpeed(value: number) {
    this._nextRoadSpeed = value
  }

  get roadLimits() {
    return this._roadLimits
  }

  set roadLimits(value: Entity[]) {
    this._roadLimits = value
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
    this._player.moveToStartPosition()
    this._vehicles.forEach((vehicle, index) => vehicle.moveToStartPosition(400 + index * 400))
    this._vehicles.forEach(vehicle => {
      vehicle.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.VEHICLE })
    })

    this._road.setSpeed({ xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD })
    this._road.setAcceleration({ xAcceleration: 0, yAcceleration: 0 })

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
    this.displayFPS()
    this.checkGameOver()

    this._vehicles.forEach((vehicle, index) => {
      for (let i = index + 1; i < this._vehicles.length; i++) {
        Collision.checkCollision(vehicle, this._vehicles[i])
      }
    })
  }

  mainLoop(time: number) {
    const dt = Timer.getDelta(time)

    this.calculateFPS(performance.now())

    switch (this.currentGameState) {
      case GAME_STATE.RUNNING:
        this.running(dt)
        this.goToNextLevel()
        break
      case GAME_STATE.GAME_OVER:
        this.startNewGame()
        break
      default:
        break
    }

    requestAnimationFrame(this.mainLoop.bind(this))
  }

  calculateFPS(time: number) {
    this._frameCount++

    if (time - this._lastFpsUpdateTime > FPS_UPDATE_INTERVAL) {
      const delta = (time - this._lastFpsUpdateTime) / 1000
      this._fps = this._frameCount / delta
      this._lastFpsUpdateTime = time
      this._frameCount = 0
    }
  }

  displayFPS() {
    if (this._ctx) {
      this._ctx.save()
      this._ctx.font = 'bold 18px Arial'
      this._ctx.fillStyle = 'White'
      this._ctx.strokeStyle = 'Black'
      this._ctx.lineWidth = 1
      const fpsText = `FPS: ${Math.round(this._fps)}`
      this._ctx.fillText(fpsText, this._canvas!.width - 100, 30)
      this._ctx.strokeText(fpsText, this._canvas!.width - 100, 30)
      this._ctx.restore()
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
    if (
      this._player.checkCollision(...this._vehicles, ...this._roadLimits) &&
      this._player.state !== Player.EXPLODING
    ) {
      this._player.setState(Player.EXPLODING)
      setTimeout(() => {
        this._currentGameState = GAME_STATE.GAME_OVER
        this?.submitScore({
          data: {
            name: this.name,
            codersforce: this._currentLevel
          },
          ratingFieldName: 'codersforce',
          teamName: ''
        })
      }, 1000)
    }
  }

  startNewGame() {
    this._currentLevelTime = TIME_BETWEEN_LEVELS
    this._currentLevel = 1
    this._currentGameState = GAME_STATE.RUNNING
    this._nextRoadSpeed = INITIAL_SPEED.ROAD
    this.resetEntities()
  }
}

export default Game
