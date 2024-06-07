import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  endGame: boolean
}

export const initialState: GameState = {
  endGame: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setEndGame: (state: GameState, action: PayloadAction<boolean>) => {
      state.endGame = action.payload
    }
  }
})

export const { setEndGame } = gameSlice.actions
export default gameSlice
