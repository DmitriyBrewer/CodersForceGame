export type Position = {
  xPosition: number
  yPosition: number
}

export type Speed = {
  xSpeed: number
  ySpeed: number
}

export type Acceleration = {
  xAcceleration: number
  yAcceleration: number
}

export type InputStates = {
  [key: string]: unknown
}

export type ImageDictionary = {
  [key: string]: HTMLImageElement
}

export type SpriteConfig = {
  position: Position
  width: number
  height: number
}

export type DrawConfig = {
  position: Position
  scale: number
}

export type AnimationConfig = {
  numberOfPostures: number
  numberOfFramesPerPosture: number
  width: number
  height: number
}
