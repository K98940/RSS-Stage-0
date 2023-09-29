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
        const levelTitles = ['просто', 'легко', 'несложно']
        label.innerText = levelTitles[value - 4]

        const line = Array(value)
        const matrix = line.fill(0).reduce(arr => {

          arr.push(Array(value).fill(0))
          return arr
        }, [])
        game.desk = matrix

        game.desk[0][0] = 4
        game.desk[0][3] = 4
        game.desk[0][4] = 2
        game.desk[3][2] = 16

        renders.renderDesk(game)
        break;

      default:
        break;
    }
    return true
  },
}

const getRandomNumber = (n) => {
  let x = Math.random() * n
  return Math.floor(x)
}