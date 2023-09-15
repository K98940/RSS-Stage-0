import { stateHandler } from './stateHandler.js'

const stateObj = {
  audio: {
    isPlay: false,
    currentTime: 0,
    currentTrack: './assets/audio/0.mp3',
  },
}

export const state = new Proxy(stateObj, stateHandler)