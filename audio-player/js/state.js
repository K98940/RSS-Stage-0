import { stateHandler } from './stateHandler.js'

export const playList =
  [
    {
      url: './assets/audio/01 - Fortress.mp3',
      name: 'Diablo 2 LOD - Fortress',
    },
    {
      url: './assets/audio/02 - Halls.mp3',
      name: 'Diablo 2 LOD - Halls',
    },
    {
      url: './assets/audio/03 - Ancients.mp3',
      name: 'Diablo 2 LOD - Ancients',
    },
  ]

const stateObj = {
  audio: {
    isPlay: false,
    currentTime: 0,
    volume: 0.5,
    currentTrack: playList[0],
  },
}

export const state = new Proxy(stateObj, stateHandler)
