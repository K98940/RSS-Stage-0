import { handleState } from './handleState.js'

const stateObj = {
  nickname: 'anonymous',
  gameLevel: 4,
  level: 0,
  score: 0,
  maxScore: 2048,
  cellSize: '3',
  animationDuration: '300',
  hint: false,
  msg: ['Game Over, но можно попробовать еще раз!', 'Yeah, piece of cake!', 'The End?', 'Конец. Титров не будет.', 'The results table will be ready soon!'],
  img: [
    ['stones-0.jpg', 'stones-1.jpg', 'stones-2.jpg', 'stones-3.jpg', 'stones-4.jpg', 'stones-5.jpg', 'stones-6.jpg'],
    ['cat-1.jpg', 'cat-2.jpg', 'cat-3.jpg', 'cat-4.jpg', 'cat-5.jpg', 'cat-6.jpg', 'cat-7.jpg', 'cat-8.jpg', 'cat-9.jpg', 'cat-10.jpg'],
  ],
}

export const game = {
  desk: null
}
export const state = new Proxy(stateObj, handleState)