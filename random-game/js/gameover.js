import * as api from './api.js'
import { showWinMessage } from './message.js'

export const win = () => {
  api.saveResult()
  showWinMessage()
}

export const loose = () => {
  api.saveResult()
  showWinMessage()
}