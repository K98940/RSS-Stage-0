import { handleState } from './handleState.js'

const stateObj = {
  gameLevel: 4,
}

export const state = new Proxy(stateObj, handleState)