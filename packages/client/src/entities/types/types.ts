export interface Position {
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

export type RoadLimit = {
  height: number
  width: number
  position: Position
}

export type InputStates = {
  [key: string]: boolean
}

export type ImageDictionary = {
  [key: string]: HTMLImageElement
}

export type SpriteConfig = {
  x: number
  y: number
  width: number
  height: number
}

export type DrawConfig = {
  xPosition: number
  yPosition: number
  scale: number
}
