// import Road from '../road'
// import Game, { GAME_STATE, INITIAL_SPEED, TIME_BETWEEN_LEVELS } from './index'
// import Load from './utils/Load'

// jest.mock('./utils/Load')
// jest.mock('./utils/Timer')
// jest.mock('../road')

// describe('Game Class', () => {
//   let game: Game
//   let mockCanvas: HTMLCanvasElement
//   let mockCtx: CanvasRenderingContext2D
//   let deltaTime: number
//   let nextRoadSpeed: number

//   beforeEach(() => {
//     game = new Game()
//     mockCanvas = document.createElement('canvas')
//     mockCtx = mockCanvas.getContext('2d') as CanvasRenderingContext2D
//     game.canvas = mockCanvas
//     game.ctx = mockCtx
//   })

//   it('should initialize with correct default values', () => {
//     expect(game.currentGameState).toBe(GAME_STATE.RUNNING)
//     expect(game.currentLevel).toBe(0)
//     expect(game.currentLevelTime).toBe(TIME_BETWEEN_LEVELS)
//     expect(game.inputStates).toStrictEqual({})
//   })

//   it('should load assets correctly', async () => {
//     const mockImages: Record<string, HTMLImageElement> = { 'packages/client/src/entities/images/road.png': new Image() }
//     const mockLoadImages = Load.images as jest.Mock
//     mockLoadImages.mockResolvedValue(mockImages)

//     const callback = jest.fn()
//     await game.loadAssets(callback)

//     expect(callback).toHaveBeenCalledWith(mockImages)
//   })

//   it('should start the game correctly', () => {
//     const spyLoadAssets = jest.spyOn(game, 'loadAssets')
//     game.start(mockCanvas)

//     expect(game.canvas).toBe(mockCanvas)
//     expect(game.ctx).toBe(mockCtx)
//     expect(spyLoadAssets).toHaveBeenCalled()
//   })

//   it('should reset entities correctly', () => {
//     game.road = new Road(mockCtx, {})
//     game.road.speed = {
//       xSpeed: 0,
//       ySpeed: 0
//     }
//     game.road.acceleration = {
//       xAcceleration: 0,
//       yAcceleration: 0
//     }
//     game.resetEntities()

//     expect(game.road.speed.ySpeed).toBe(INITIAL_SPEED.ROAD)
//     expect(game.road.acceleration.yAcceleration).toBe(0)
//   })

//   it('should clear the canvas', () => {
//     jest.spyOn(game, 'clearCanvas')
//     game.running(deltaTime)
//     expect(game.clearCanvas).toHaveBeenCalled()
//   })

//   it('should update road if road exists', () => {
//     game.road = new Road(mockCtx, {})

//     game.road.speed = {
//       xSpeed: 0,
//       ySpeed: 1
//     }
//     game.road.acceleration = {
//       xAcceleration: 0,
//       yAcceleration: 0
//     }
//     const initialYAcceleration = game.road.acceleration.yAcceleration
//     game.nextRoadSpeed = nextRoadSpeed
//     game.running(deltaTime)
//     expect(game.road.update).toHaveBeenCalledWith(deltaTime)
//     expect(game.road.acceleration.yAcceleration).toBe(initialYAcceleration)
//   })

//   it('should handle errors and change game state to GAME_OVER', () => {
//     const spyConsoleError = jest.spyOn(console, 'error')
//     game.road = new Road(mockCtx, {})
//     game.road.update = jest.fn(() => {
//       throw new Error('Test error')
//     })

//     game.running(deltaTime)

//     expect(spyConsoleError).toHaveBeenCalledWith('Ошибка во время выполнения игры:', expect.any(Error))
//     expect(game.currentGameState).toBe(GAME_STATE.GAME_OVER)
//   })
// })
