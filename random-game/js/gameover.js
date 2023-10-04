import * as api from './api.js'
import { renderScoreBoard } from './handleState.js'
import { state } from './state.js'

export const win = () => {
  api.saveResult()
  state.score = 0
  alert('you win :(')
  state.gameLevel = state.gameLevel
  renderScoreBoard()
}

export const loose = () => {
  api.saveResult()
  state.score = 0
  alert('you loose :)')
  state.gameLevel = state.gameLevel
  renderScoreBoard()

}