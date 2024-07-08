import Collision from '@/entities/game/utils/Сollision'

import Player from '../player'
import Road from '../road'
import Vehicle from '../vehicle'
import Game, { GAME_STATE, INITIAL_SPEED, TIME_BETWEEN_LEVELS } from './index'
import Load from './utils/Load'
import Timer from './utils/Timer'

jest.mock('./utils/Load')
jest.mock('./utils/Timer')
jest.mock('../road')
jest.mock('../player')
jest.mock('../vehicle')
jest.mock('@/entities/game/utils/Сollision')

describe('Game Class', () => {
  let game: Game
  let mockCanvas: HTMLCanvasElement
  let mockCtx: CanvasRenderingContext2D
  let deltaTime: number

  const FRAME_TIME = 16
  const INITIAL_ROAD_SPEED = INITIAL_SPEED.ROAD
  const NEXT_ROAD_SPEED = 0.05
  const submitScoreMock = jest.fn().mockResolvedValue(Promise.resolve())

  beforeEach(() => {
    game = new Game(submitScoreMock, 'TestPlayer')
    mockCanvas = document.createElement('canvas')
    mockCtx = mockCanvas.getContext('2d') as CanvasRenderingContext2D
    game.canvas = mockCanvas
    game.ctx = mockCtx
    deltaTime = FRAME_TIME
  })

  it('инициализация с правильными значениями по умолчанию', () => {
    expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
    expect(game.currentLevel).toBe(1)
    expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)
    expect(game.inputStates).toStrictEqual({})
  })

  it('правильная загрузка ресурсов', async () => {
    const mockImages: Record<string, HTMLImageElement> = {
      'packages/client/src/entities/images/road.png': new Image(),
      'packages/client/src/entities/images/player.png': new Image(),
      'packages/client/src/entities/images/taxi.png': new Image(),
      'packages/client/src/entities/images/car.png': new Image(),
      'packages/client/src/entities/images/explosion.png': new Image(),
      'packages/client/src/entities/images/police.png': new Image(),
      'packages/client/src/entities/images/ambulance.png': new Image()
    }
    const mockLoadImages = Load.images as jest.Mock
    mockLoadImages.mockResolvedValue(mockImages)

    const callback = jest.fn()
    await game.loadAssets(callback)

    expect(callback).toHaveBeenCalledWith(mockImages)
  })

  it('правильное начало игры', () => {
    const spyLoadAssets = jest.spyOn(game, 'loadAssets')
    game.start(mockCanvas)

    expect(game.canvas).toBe(mockCanvas)
    expect(game.ctx).toBe(mockCtx)
    expect(spyLoadAssets).toHaveBeenCalled()
  })

  it('правильная сбрасывание сущностей', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]
    const mockRoad = new Road(mockCtx, {})

    game.player = mockPlayer
    game.vehicles = mockVehicles
    game.road = mockRoad

    game.road.speed = {
      xSpeed: 0,
      ySpeed: 0
    }
    game.road.acceleration = {
      xAcceleration: 0,
      yAcceleration: 0
    }

    const spyPlayerMoveToStart = jest.spyOn(mockPlayer, 'moveToStartPosition')
    const spyPlayerSetState = jest.spyOn(mockPlayer, 'setState')

    const spyRoadSetSpeed = jest.spyOn(mockRoad, 'setSpeed')
    const spyRoadSetAcceleration = jest.spyOn(mockRoad, 'setAcceleration')

    game.resetEntities()

    expect(spyPlayerMoveToStart).toHaveBeenCalled()
    mockVehicles.forEach((vehicle, index) => {
      expect(vehicle.moveToStartPosition).toHaveBeenCalledWith(400 + index * 400)
      expect(vehicle.setSpeed).toHaveBeenCalledWith({ xSpeed: 0, ySpeed: INITIAL_SPEED.VEHICLE })
    })
    expect(spyRoadSetSpeed).toHaveBeenCalledWith({ xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD })
    expect(spyRoadSetAcceleration).toHaveBeenCalledWith({ xAcceleration: 0, yAcceleration: 0 })
    expect(spyPlayerSetState).toHaveBeenCalledWith(Player.RUNNING)
  })

  it('очистка канвас', () => {
    const clearRectSpy = jest.spyOn(mockCtx, 'clearRect')
    game.clearCanvas()
    expect(clearRectSpy).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height)
  })

  it('правильный запуск игры', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]
    const mockRoad = new Road(mockCtx, {})

    mockRoad.speed = { xSpeed: 0, ySpeed: INITIAL_ROAD_SPEED }
    mockPlayer.update = jest.fn()
    mockVehicles.forEach(vehicle => {
      vehicle.update = jest.fn()
      vehicle.position = { xPosition: 0, yPosition: 0 }
    })

    game.player = mockPlayer
    game.vehicles = mockVehicles
    game.road = mockRoad

    const spyClearCanvas = jest.spyOn(game, 'clearCanvas')
    const spyRoadUpdate = jest.spyOn(mockRoad, 'update')
    const spyPlayerUpdate = jest.spyOn(mockPlayer, 'update')
    const spyVehicleUpdate = mockVehicles.map(vehicle => jest.spyOn(vehicle, 'update'))
    const spyRoadSetAcceleration = jest.spyOn(mockRoad, 'setAcceleration')
    const spyDisplayScore = jest.spyOn(game, 'displayScore')
    const spyCheckGameOver = jest.spyOn(game, 'checkGameOver')
    const spyCollisionCheck = jest.spyOn(Collision, 'checkCollision')

    game.nextRoadSpeed = NEXT_ROAD_SPEED
    mockRoad.speed.ySpeed = INITIAL_ROAD_SPEED

    game.running(deltaTime)

    expect(spyClearCanvas).toHaveBeenCalled()
    expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
    expect(spyRoadSetAcceleration).toHaveBeenCalledWith({ xAcceleration: 0, yAcceleration: 0 })
    expect(spyRoadUpdate).toHaveBeenCalledWith(deltaTime)
    expect(spyPlayerUpdate).toHaveBeenCalledWith(deltaTime)
    spyVehicleUpdate.forEach(spy => expect(spy).toHaveBeenCalledWith(deltaTime))
    expect(game.currentLevelTime).toBeLessThan(TIME_BETWEEN_LEVELS)
    expect(spyDisplayScore).toHaveBeenCalled()
    expect(spyCheckGameOver).toHaveBeenCalled()
    expect(spyCollisionCheck).toHaveBeenCalled()
  })

  it('должен вызывать running и goToNextLevel, когда игра запущена', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockRoad = new Road(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]

    game.player = mockPlayer
    game.road = mockRoad
    game.vehicles = mockVehicles

    mockRoad.speed = { xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD }
    jest.spyOn(Timer, 'getDelta').mockReturnValue(FRAME_TIME)
    const spyRunning = jest.spyOn(game, 'running')
    const spyGoToNextLevel = jest.spyOn(game, 'goToNextLevel')

    game.currentGameState = GAME_STATE.RUNNING
    const time = performance.now()
    game.mainLoop(time)

    expect(spyRunning).toHaveBeenCalledWith(FRAME_TIME)
    expect(spyGoToNextLevel).toHaveBeenCalled()
  })

  it('правильный переход на следующий уровень', () => {
    const mockRoad = new Road(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]

    game.road = mockRoad
    game.vehicles = mockVehicles

    mockRoad.speed = { xSpeed: 0, ySpeed: INITIAL_SPEED.ROAD }
    mockRoad.acceleration = { xAcceleration: 0, yAcceleration: 0 }
    mockVehicles.forEach(vehicle => {
      vehicle.speed = { xSpeed: 0, ySpeed: INITIAL_SPEED.VEHICLE }
      vehicle.acceleration = { xAcceleration: 0, yAcceleration: 0 }
    })

    game.currentLevelTime = -1

    const spySetRoadSpeed = jest.spyOn(mockRoad, 'setSpeed')
    const spySetRoadAcceleration = jest.spyOn(mockRoad, 'setAcceleration')
    const spyVehicleSetSpeed = mockVehicles.map(vehicle => jest.spyOn(vehicle, 'setSpeed'))
    const spyVehicleSetAcceleration = mockVehicles.map(vehicle => jest.spyOn(vehicle, 'setAcceleration'))

    game.goToNextLevel()

    expect(game.currentLevel).toBe(2)
    expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)

    expect(spySetRoadAcceleration).toHaveBeenCalledWith({ xAcceleration: 0, yAcceleration: expect.any(Number) })
    expect(spySetRoadSpeed).toHaveBeenCalledWith({ xSpeed: 0, ySpeed: expect.any(Number) })

    mockVehicles.forEach((vehicle, index) => {
      expect(spyVehicleSetAcceleration[index]).toHaveBeenCalledWith({
        xAcceleration: 0,
        yAcceleration: expect.any(Number)
      })
      expect(spyVehicleSetSpeed[index]).toHaveBeenCalledWith({ xSpeed: 0, ySpeed: expect.any(Number) })
    })
  })
  it('правильное отображение счёта', () => {
    const spyFillText = jest.spyOn(mockCtx, 'fillText')
    const spyStrokeText = jest.spyOn(mockCtx, 'strokeText')
    game.displayScore()
    expect(spyFillText).toHaveBeenCalled()
    expect(spyStrokeText).toHaveBeenCalled()
  })

  it('правильная проверка завершения игры', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]
    const mockRoadLimits = [
      { height: mockCanvas.height, width: 1, position: { xPosition: 120, yPosition: 0 } },
      { height: mockCanvas.height, width: 1, position: { xPosition: mockCanvas.width - 110, yPosition: 0 } }
    ]

    game.player = mockPlayer
    game.vehicles = mockVehicles
    game.roadLimits = mockRoadLimits

    const spyCheckCollision = jest.spyOn(mockPlayer, 'checkCollision').mockReturnValue(true)
    const spySetState = jest.spyOn(mockPlayer, 'setState')

    game.checkGameOver()

    expect(spyCheckCollision).toHaveBeenCalledWith(...mockVehicles, ...mockRoadLimits)
    expect(spySetState).toHaveBeenCalledWith(Player.EXPLODING)
    setTimeout(() => {
      expect(game.currentGameState).toBe(GAME_STATE.GAME_OVER)
    }, 1000)
  })

  it('правильное начало новой игры', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]
    const mockRoad = new Road(mockCtx, {})

    game.player = mockPlayer
    game.vehicles = mockVehicles
    game.road = mockRoad

    const spyResetEntities = jest.spyOn(game, 'resetEntities')
    const spyPlayerMoveToStart = jest.spyOn(mockPlayer, 'moveToStartPosition')
    const spyVehicleMoveToStart = mockVehicles.map(vehicle => jest.spyOn(vehicle, 'moveToStartPosition'))

    mockVehicles.forEach(vehicle => {
      jest.spyOn(vehicle, 'setSpeed')
      jest.spyOn(vehicle, 'setAcceleration')
    })

    game.currentLevelTime = 0
    game.currentLevel = 10
    game.currentGameState = GAME_STATE.GAME_OVER
    game.nextRoadSpeed = 10

    game.startNewGame()

    expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)
    expect(game.currentLevel).toBe(1)
    expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
    expect(game.nextRoadSpeed).toBe(INITIAL_SPEED.ROAD)
    expect(spyResetEntities).toHaveBeenCalled()
    expect(spyPlayerMoveToStart).toHaveBeenCalled()
    spyVehicleMoveToStart.forEach(spy => expect(spy).toHaveBeenCalled())
  })
})
