import { handleState } from './handleState.js'

const stateObj = {
  touch: {
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    code: null,
  },
  nickname: 'anonymous',
  gameLevel: 4,
  level: 0,
  score: 0,
  maxScore: 2048,
  cellSize: '3',
  animationDuration: '300',
  hint: false,
  sound: {
    volume: 0.2,
    isPlay: false,
    interval: 5000,
    src: "./assets/sounds/",
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
  msg: ['Game Over, но можно попробовать еще раз!', 'Yeah, piece of cake!', 'The End?', 'Конец. Титров не будет.', 'The results table will be ready soon!'],
  img: [
    ['stones-0.jpg', 'stones-1.jpg', 'stones-2.jpg', 'stones-3.jpg', 'stones-4.jpg', 'stones-5.jpg', 'stones-6.jpg'],
    ['cat-1.jpg', 'cat-2.jpg', 'cat-3.jpg', 'cat-4.jpg', 'cat-5.jpg', 'cat-6.jpg', 'cat-7.jpg', 'cat-8.jpg', 'cat-9.jpg', 'cat-10.jpg'],
  ],
  intro: `%c1. Для проверяющих наверху есть переключатель для упрощения тестирования. Он уменьшает количество очков необходимых для победы.

2. Там же, наверху, можно включить отображение цифровых значений на игровых блоках - если захочется чуть упростить игру.

3. Крутые звуковые спецэффекты звучат только при первом появлении нового элемента - это не баг, это фича.

Сразитесь с %cReviewer1 %cи да пребудет с вами сила.`,
}

export const game = {
  desk: null
}
export const state = new Proxy(stateObj, handleState)