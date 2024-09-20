import { handleState } from './handleState.js';

const stateObj = {
  touch: {
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    code: null,
    SENSETIVE: 20,
  },
  nickname: 'anonymous',
  gameLevel: 4,
  level: 0,
  score: 0,
  maxScore: 4096,
  cellSize: '3',
  animationDuration: '300',
  hint: false,
  sound: {
    volume: 0.2,
    isPlay: false,
    interval: 5000,
    src: './assets/sounds/',
    isReveal: {
      2: false,
      4: false,
      8: false,
      16: false,
      32: false,
      64: false,
      128: false,
      256: false,
      512: false,
      1024: false,
    },
  },
  msg: [
    'Game Over, but you can try again!',
    'Yeah, piece of cake!',
    'The End',
    'The End. There will be no credits.',
    'The results table will be ready soon!',
  ],
  img: [
    [
      'stones-0.webp',
      'stones-1.webp',
      'stones-2.webp',
      'stones-3.webp',
      'stones-4.webp',
      'stones-5.webp',
      'stones-6.webp',
    ],
    [
      'cat-1.webp',
      'cat-2.webp',
      'cat-3.webp',
      'cat-4.webp',
      'cat-5.webp',
      'cat-6.webp',
      'cat-7.webp',
      'cat-8.webp',
      'cat-9.webp',
      'cat-10.webp',
    ],
  ],
  intro: `%c1. There is a switch at the top to simplify testing. It reduces the number of points needed to win.

  2. In the same place, at the top, you can turn on the display of digital values on the game blocks - if you want to simplify the game a little.

  3. Cool sound effects sound only when a new element appears for the first time - this is not a bug, it's a feature.

  4. There is touchpad support - you can play on a mobile phone!`,
};

export const game = {
  desk: null,
};
export const state = new Proxy(stateObj, handleState);
