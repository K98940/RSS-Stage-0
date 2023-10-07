import { handleState } from './handleState.js'

const stateObj = {
  nickname: 'anonymous',
  gameLevel: 4,
  level: 0,
  score: 0,
  maxScore: 2048,
  cellSize: '3',
  animationDuration: '300',
}

export const game = {
  desk: null
}
export const state = new Proxy(stateObj, handleState)