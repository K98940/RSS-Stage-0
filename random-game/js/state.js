import { handleState } from './handleState.js'

const stateObj = {
  gameLevel: 4,
  score: 0,
  cellSize: '4',
  animationDuration: '1000',
}

export const game = {
  desk: null
}
export const state = new Proxy(stateObj, handleState)