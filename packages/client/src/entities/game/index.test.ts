import Road from '../road'
import Game, { GAME_STATE, INITIAL_SPEED, TIME_BETWEEN_LEVELS } from './index'
import Load from './utils/Load'

jest.mock('./utils/Load')
jest.mock('./utils/Timer')
jest.mock('../road')

describe('Game Class', () => {
  let game: Game
  let mockCanvas: HTMLCanvasElement
  let mockCtx: CanvasRenderingContext2D

  beforeEach(() => {
    game = new Game()
    mockCanvas = document.createElement('canvas')
    mockCtx = mockCanvas.getContext('2d') as CanvasRenderingContext2D
    game.canvas = mockCanvas
    game.ctx = mockCtx
  })

  it('should initialize with correct default values', () => {
    expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
    expect(game.currentLevel).toBe(0)
    expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)
    expect(game.inputStates).toStrictEqual({})
  })

  it('should load assets correctly', async () => {
    const mockImages: Record<string, HTMLImageElement> = { 'packages/client/src/entities/images/road.png': new Image() }
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
    game.road = new Road(mockCtx, {})
    game.road.speed = {
      xSpeed: 0,
      ySpeed: 0
    }
    game.road.acceleration = {
      xAcceleration: 0,
      yAcceleration: 0
    }
    game.resetEntities()

    expect(game.road.speed.ySpeed).toBe(INITIAL_SPEED.ROAD)
    expect(game.road.acceleration.yAcceleration).toBe(0)
  })

  // test('should clear the canvas', () => {
  //   const spyClearRect = jest.spyOn(mockCtx, 'clearRect')
  //   game.clearCanvas()

  //   expect(spyClearRect).toHaveBeenCalledWith(0, 0, mockCanvas.width, mockCanvas.height)
  // })

  // test('should run the game loop', () => {
  //   const spyClearCanvas = jest.spyOn(game, 'clearCanvas')
  //   game.road = new Road(mockCtx, {})
  //   game.running(16)

  //   expect(spyClearCanvas).toHaveBeenCalled()
  //   expect(game.currentLevelTime).toBeLessThan(5000)
  // })

  // test('should handle game over state', () => {
  //   const spyFillText = jest.spyOn(mockCtx, 'fillText')
  //   game.currentGameState = 2 // GAME_STATE.GAME_OVER
  //   game.gameOver()

  //   expect(spyFillText).toHaveBeenCalledWith('GAME OVER', expect.any(Number), expect.any(Number))
  // })

  // test('should advance to next level', () => {
  //   game.road = new Road(mockCtx, {})
  //   game.currentLevelTime = -1
  //   game.goToNextLevel()

  //   expect(game.currentLevel).toBe(1)
  //   expect(game.currentLevelTime).toBe(5000)
  //   expect(game.nextRoadSpeed).toBeGreaterThan(0.4)
  // })

  // test('should start a new game', () => {
  //   game.startNewGame()

  //   expect(game.currentLevel).toBe(1)
  //   expect(game.currentGameState).toBe(1) // GAME_STATE.RUNNING
  //   expect(game.currentLevelTime).toBe(5000)
  //   expect(game.nextRoadSpeed).toBe(0.4) // INITIAL_SPEED.ROAD
  // })
})
