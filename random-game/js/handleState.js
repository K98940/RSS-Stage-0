import { state, game } from "./state.js"
import * as renders from './renders.js'

export const handleState = {
  get: (target, key) => {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handleState)
    }

    return target[key]
  },
  set: (target, prop, value) => {
    target[prop] = value
    switch (prop) {
      case 'gameLevel':
        document.body.style.setProperty('--cell-size', `${state.cellSize}rem`)
        document.body.style.setProperty('--level', state.gameLevel)

        const label = document.getElementById('range-level-label')
        const maxScore = document.getElementById('score-max')
        const levelTitles = ['легко', 'просто', 'для тестера']
        const levelScore = [2048, 1024, 128]
        state.maxScore = levelScore[value - 4]
        label.innerText = levelTitles[value - 4]

        const line = Array(value)
        const matrix = line.fill(0).reduce(arr => {

          arr.push(Array(value).fill(0))
          return arr
        }, [])
        game.desk = matrix


        game.desk[0][0] = 2
        // game.desk[1][1] = 4
        // game.desk[1][2] = 64
        // game.desk[1][3] = 2

        // game.desk[2][0] = 4
        // game.desk[2][1] = 8
        // game.desk[2][2] = 32

        // game.desk[3][0] = 2
        // game.desk[3][1] = 2
        // game.desk[3][2] = 4
        // game.desk[3][3] = 8

        renders.renderDesk(game)
        state.score = 0
        break;

      case 'score':
        const scoreLabel = document.querySelector('.score>label')
        const scoreRange = document.querySelector('.score>input')
        scoreLabel.innerText = value
        scoreRange.value = value
        break

      default:
        break;
    }
    return true
  },
}
