import * as api from './api.js'
import { renderScoreBoard } from './handleState.js'
import { state } from './state.js'

const resetGame = () => {
  state.score = 0
  state.gameLevel = state.gameLevel
  renderScoreBoard()

}

export const win = () => {
  api.saveResult()
  alert('you win :(')
  resetGame()
}

export const loose = () => {
  api.saveResult()
  alert('you loose :)')
  resetGame()
}