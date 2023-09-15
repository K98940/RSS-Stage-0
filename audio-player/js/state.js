import { stateHandler } from './stateHandler.js'

const URL_PREFFIX = './assets/audio/'
export const playList =
  [
    {
      id: 0,
      url: `${URL_PREFFIX}town.mp3`,
      name: 'town',
    },
    {
      id: 1,
      url: `${URL_PREFFIX}caves.mp3`,
      name: 'caves',
    },
    {
      id: 2,
      url: `${URL_PREFFIX}Overture.mp3`,
      name: 'Overture',
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
