import { handleState } from './handleState.js'

const stateObj = {
  gameLevel: 4,
  score: 0,
  cellSize: '3',
  animationDuration: '500',
}

export const game = {
  desk: null
}
export const state = new Proxy(stateObj, handleState)