export interface Position {
  xPosition: number
  yPosition: number
}

export interface Speed {
  xSpeed: number
  ySpeed: number
}

export interface Acceleration {
  xAcceleration: number
  yAcceleration: number
}

export interface RoadLimit {
  height: number
  width: number
  position: Position
}

export interface InputStates {
  [key: string]: boolean
}
