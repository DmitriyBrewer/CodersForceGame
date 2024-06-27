import Player from '../player'
import Road from '../road'
import Vehicle from '../vehicle'
import Game, { GAME_STATE, INITIAL_SPEED, TIME_BETWEEN_LEVELS } from './index'
import Load from './utils/Load'

jest.mock('./utils/Load')
jest.mock('./utils/Timer')
jest.mock('../road')
jest.mock('../player')
jest.mock('../vehicle')

describe('Game Class', () => {
  let game: Game
  let mockCanvas: HTMLCanvasElement
  let mockCtx: CanvasRenderingContext2D
  let deltaTime: number
  const INITIAL_ROAD_SPEED = 0.1
  const NEXT_ROAD_SPEED = 0.05
  const FRAME_TIME = 16

  beforeEach(() => {
    game = new Game()
    mockCanvas = document.createElement('canvas')
    mockCtx = mockCanvas.getContext('2d') as CanvasRenderingContext2D
    game.canvas = mockCanvas
    game.ctx = mockCtx
    deltaTime = FRAME_TIME
  })

  it('should initialize with correct default values', () => {
    expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
    expect(game.currentLevel).toBe(1)
    expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)
    expect(game.inputStates).toStrictEqual({})
  })

  it('should load assets correctly', async () => {
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

  it('should start the game correctly', () => {
    const spyLoadAssets = jest.spyOn(game, 'loadAssets')
    game.start(mockCanvas)

    expect(game.canvas).toBe(mockCanvas)
    expect(game.ctx).toBe(mockCtx)
    expect(spyLoadAssets).toHaveBeenCalled()
  })

  it('should reset entities correctly', () => {
    const mockPlayer = new Player(mockCtx, {})
    const mockVehicles = [new Vehicle(mockCtx), new Vehicle(mockCtx), new Vehicle(mockCtx)]
    const mockRoad = new Road(mockCtx, {})

    game.player = mockPlayer
    game.vehicles = mockVehicles
    game.road = mockRoad

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

  it('should clear the canvas', () => {
    const clearRectSpy = jest.spyOn(mockCtx, 'clearRect')
    game.clearCanvas()
    expect(clearRectSpy).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height)
  })

  it('should run the game correctly', () => {
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
  })
})
