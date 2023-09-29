import { state, game } from './state.js'

export const handleKey = ({ code }) => {
  const calcCellsNewValue = (row, indexNew, indexOld) => {
    state.score += row[indexOld]
    row[indexNew] = row[indexOld] * 2
    row[indexOld] = 0
  }

  const moveCellsToRight = () => {
    game.desk.forEach((row, row_i) => {
      for (let col_i = row.length - 2; col_i >= 0; col_i--) {
        if (row[col_i] > 0) {
          let div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const isIdenticalCells = row[col_i + 1] === row[col_i]
          if (isIdenticalCells) {
            calcCellsNewValue(row, col_i + 1, col_i)

            div.remove()
            div = document.querySelector(`[data-xy="${row_i}${col_i + 1}"]`)
            div.firstElementChild.innerText = row[col_i + 1]
          } else if (row[col_i + 1] === 0) {
            row[col_i + 1] = row[col_i]
            row[col_i] = 0
          } else continue

          div.dataset.xy = `${row_i}${col_i + 1}`
        }

      }
    })
  }

  const moveCellsToLeft = () => {
    game.desk.forEach((row, row_i) => {
      for (let col_i = 1; col_i < row.length; col_i++) {
        if (row[col_i] > 0) {
          let div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const isIdenticalCells = row[col_i - 1] === row[col_i]
          if (isIdenticalCells) {
            calcCellsNewValue(row, col_i - 1, col_i)

            div.remove()
            div = document.querySelector(`[data-xy="${row_i}${col_i - 1}"]`)
            div.firstElementChild.innerText = row[col_i - 1]
          } else if (row[col_i - 1] === 0) {
            row[col_i - 1] = row[col_i]
            row[col_i] = 0
          } else continue

          div.dataset.xy = `${row_i}${col_i - 1}`
        }

      }
    })
  }

  window.removeEventListener('keydown', handleKey)
  window.addEventListener('keyup', handleKeyUp)

  switch (code) {
    case 'ArrowRight':
      game.desk.forEach(cellsCount => moveCellsToRight())
      break;
    case 'ArrowLeft':
      game.desk.forEach(cellsCount => moveCellsToLeft())
      break;

    default:
      break;
  }
}

const handleKeyUp = () => {
  window.addEventListener('keydown', handleKey)
}