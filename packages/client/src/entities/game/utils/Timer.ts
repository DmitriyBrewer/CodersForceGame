class Timer {
  private static oldTime = 0

  static getDelta(currentTime: number): number {
    const delta = currentTime - Timer.oldTime
    Timer.oldTime = currentTime
    return delta
  }

  static distanceToMove(delta: number, speed: number): number {
    return (speed * delta) / 1000
  }
}

export default Timer
