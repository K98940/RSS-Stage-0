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
      colorTextControls: 'rgb(255, 255, 255)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(140, 120, 120, 0.7)',
      colorBgPlaylistActive: 'rgba(100, 80, 80, 0.7)',
      colorBgPlaylistHover: 'rgba(40, 20, 20, 0.7)',
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
      colorTextControls: 'rgb(255, 255, 255)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(110, 170, 170, 0.7)',
      colorBgPlaylistActive: 'rgba(70, 130, 130, 0.7)',
      colorBgPlaylistHover: 'rgba(10, 70, 70, 0.7)',
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
      colorTextControls: 'rgb(255, 255, 255)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(80, 100, 150, 0.7)',
      colorBgPlaylistActive: 'rgba(40, 60, 110, 0.7)',
      colorBgPlaylistHover: 'rgba(0, 0, 50, 0.7)',
      button: {
        url: '../assets/icons/btn-play-dimash.png',
        hue: '0deg',
      },
    },
    {
      id: 3,
      url: `${URL_PREFFIX}Vangelis - Prelude-audio.mp3`,
      name: 'Vangelis - Prelude',
      cover: `${COVER_PREFFIX}3`,
      colorTextControls: 'rgb(255, 255, 255)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(120, 120, 140, 0.7)',
      colorBgPlaylistActive: 'rgba(80, 80, 100, 0.7)',
      colorBgPlaylistHover: 'rgba(20, 20, 40, 0.7)',
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
      colorTextControls: 'rgb(255, 255, 255)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(150, 150, 150, 0.7)',
      colorBgPlaylistActive: 'rgba(110, 110, 110, 0.7)',
      colorBgPlaylistHover: 'rgba(50, 50, 50, 0.7)',
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
      colorTextControls: 'rgb(0, 0, 0)',
      colorPlaylistText: 'rgb(255, 255, 255)',
      colorBgPlaylist: 'rgba(160, 210, 110, 0.7)',
      colorBgPlaylistActive: 'rgba(120, 170, 70, 0.7)',
      colorBgPlaylistHover: 'rgba(80, 130, 30, 0.7)',
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
    currentTrack: playList[0],
  },
}

export const state = new Proxy(stateObj, stateHandler)
