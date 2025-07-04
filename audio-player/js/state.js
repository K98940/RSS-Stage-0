import { stateHandler } from './stateHandler.js'
import { playList } from './playList.full.js'

export { playList };

// const URL_PREFFIX = './assets/audio/'
// const COVER_PREFFIX = '../assets/img/covers/'
// export const playList = [ ... ] // удалено

const stateObj = {
  audio: {
    isPlay: false,
    currentTime: 0,
    volume: 0.5,
    currentTrack: playList[5],
  },
}

export const state = new Proxy(stateObj, stateHandler)
