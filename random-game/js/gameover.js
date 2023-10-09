import * as api from './api.js'
import { showWinMessage } from './message.js'

export const win = () => {
  api.saveResult()
  showWinMessage()
  // setTimeout(() => { resetGame() }, 0)
}

export const loose = () => {
  api.saveResult()
  showWinMessage()
  // setTimeout(() => { resetGame() }, 0)
}