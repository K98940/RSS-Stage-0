import { stateHandler } from './stateHandler.js'

const URL_PREFFIX = './assets/audio/'
const COVER_PREFFIX = '../assets/img/covers/'

export const playList =
  [
    {
      id: 0,
      url: `${URL_PREFFIX}town.mp3`,
      name: 'Diablo II - Town',
      cover: `${COVER_PREFFIX}0`,
      colorBaseColor: 'hsla(0, 51%, 24%, 0.635)',
      button: {
        url: '../assets/icons/btn-play-diablo.png',
        hue: '240deg',
      },
    },
    {
      id: 1,
      url: `${URL_PREFFIX}Floating Museum.mp3`,
      name: 'Ghost in the Shell - Floating Museum',
      cover: `${COVER_PREFFIX}1`,
      colorBaseColor: 'hsla(180, 26%, 55%, 0.4)',
      button: {
        url: '../assets/icons/btn-play-ghost.png',
        hue: '170deg',
      },
    },
    {
      id: 2,
      url: `${URL_PREFFIX}Кудайберген Димаш – Знай.mp3`,
      name: 'Кудайберген Димаш – Знай',
      cover: `${COVER_PREFFIX}2`,
      colorBaseColor: 'hsla(223, 30%, 45%, 0.4)',
      button: {
        url: '../assets/icons/btn-play-dimash.png',
        hue: '240deg',
      },
    },
    {
      id: 3,
      url: `${URL_PREFFIX}Vangelis - Prelude-audio.mp3`,
      name: 'Vangelis - Prelude',
      cover: `${COVER_PREFFIX}3`,
      colorBaseColor: 'hsla(240, 8%, 51%, 0.4)',
      button: {
        url: '../assets/icons/btn-play-vangelis.png',
        hue: '280deg',
      },
    },
    {
      id: 4,
      url: `${URL_PREFFIX}Silent Hill 4 - Room of angel.mp3`,
      name: 'Silent Hill 4 - Room of angel',
      cover: `${COVER_PREFFIX}4`,
      colorBaseColor: 'hsla(0, 0%, 59%, 0.4)',
      button: {
        url: '../assets/icons/btn-play-silenthill.png',
        hue: '45deg',
      },
    },
    {
      id: 5,
      url: `${URL_PREFFIX}Spirited Away  Reprise.mp3`,
      name: 'Spirited Away - Reprise',
      cover: `${COVER_PREFFIX}5`,
      colorBaseColor: 'hsla(90, 53%, 63%, 0.4)',
      button: {
        url: '../assets/icons/btn-play-spirited-away.png',
        hue: '260deg',
      },
    },
  ]

const stateObj = {
  audio: {
    isPlay: false,
    currentTime: 0,
    volume: 0.5,
    currentTrack: playList[5],
  },
}

export const state = new Proxy(stateObj, stateHandler)
