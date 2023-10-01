import { state, game } from './state.js'
import { win, loose } from './gameover.js'

export const handleKey = ({ code }) => {

  const moveCellsToRight = () => {
    game.desk.forEach((row, row_i) => {
      for (let col_i = row.length - 2; col_i >= 0; col_i--) {
        if (row[col_i] > 0) {
          const div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row_i}${col_i + 1}"]`)

          const isIdenticalCells = row[col_i + 1] === row[col_i]
          if (isIdenticalCells && cellsMustDie) {
            stepScore += row[col_i]

            cellsMustDie.remove()

            row[col_i + 1] = row[col_i] * 2
            row[col_i] = 0
            div.firstElementChild.innerText = row[col_i + 1]
            isTurnComplete = true

          } else if (row[col_i + 1] === 0) {
            row[col_i + 1] = row[col_i]
            row[col_i] = 0
            isTurnComplete = true
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
          const div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row_i}${col_i - 1}"]`)

          const isIdenticalCells = row[col_i - 1] === row[col_i]
          if (isIdenticalCells && cellsMustDie) {
            stepScore += row[col_i]

            cellsMustDie.remove()

            row[col_i - 1] = row[col_i] * 2
            row[col_i] = 0
            div.firstElementChild.innerText = row[col_i - 1]
            isTurnComplete = true

          } else if (row[col_i - 1] === 0) {
            row[col_i - 1] = row[col_i]
            row[col_i] = 0
            isTurnComplete = true
          } else continue

          div.dataset.xy = `${row_i}${col_i - 1}`
        }

      }
    })
  }

  const moveCellsToDown = () => {
    const { desk } = game

    for (let row = desk.length - 2; row >= 0; row--) {
      for (let col = 0; col < desk.length; col++) {
        if (desk[row][col] > 0) {
          const div = document.querySelector(`[data-xy="${row}${col}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row + 1}${col}"]`)

          const isIdenticalCells = desk[row + 1][col] === desk[row][col]
          if (isIdenticalCells) {
            stepScore += desk[row][col]

            cellsMustDie.remove()

            desk[row + 1][col] = desk[row][col] * 2
            div.firstElementChild.innerText = desk[row + 1][col]
            desk[row][col] = 0
            isTurnComplete = true

          } else if (desk[row + 1][col] === 0) {
            desk[row + 1][col] = desk[row][col]
            desk[row][col] = 0
            isTurnComplete = true
          } else continue

          div.dataset.xy = `${row + 1}${col}`
        }
      }
    }
  }

  const moveCellsToUp = () => {
    const { desk } = game

    for (let row = 1; row < desk.length; row++) {
      for (let col = 0; col < desk.length; col++) {
        if (desk[row][col] > 0) {
          const div = document.querySelector(`[data-xy="${row}${col}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row - 1}${col}"]`)

          const isIdenticalCells = desk[row - 1][col] === desk[row][col]
          if (isIdenticalCells) {
            stepScore += desk[row][col]

            cellsMustDie.remove()

            desk[row - 1][col] = desk[row][col] * 2
            div.firstElementChild.innerText = desk[row - 1][col]
            desk[row][col] = 0
            isTurnComplete = true

          } else if (desk[row - 1][col] === 0) {
            desk[row - 1][col] = desk[row][col]
            desk[row][col] = 0
            isTurnComplete = true
          } else continue

          div.dataset.xy = `${row - 1}${col}`
        }
      }
    }
  }

  window.removeEventListener('keydown', handleKey)
  const { desk } = game
  let isTurnComplete = false
  let stepScore = 0

  switch (code) {
    case 'ArrowRight':
      desk.forEach(cellsCount => moveCellsToRight())
      moveCellsToRight()
      break;
    case 'ArrowLeft':
      desk.forEach(cellsCount => moveCellsToLeft())
      moveCellsToLeft()
      break;
    case 'ArrowDown':
      desk.forEach(cellsCount => moveCellsToDown())
      moveCellsToDown()
      break;
    case 'ArrowUp':
      desk.forEach(cellsCount => moveCellsToUp())
      moveCellsToUp()
      break;

    default:
      break;
  }

  state.score += stepScore
  if (state.score >= state.maxScore) {
    win()
  }


  // deleteDiedCells()
  if (isTurnComplete) addCell(getRandomIndex())
  // test()

  setTimeout(() => {
    window.addEventListener('keydown', handleKey)
  }, state.animationDuration)

}

const getRandomIndex = () => {
  let x = Math.random()
  const emptyCells = game.desk.reduce((cells, row, r) => {
    row.map((cell, c) => {
      if (cell === 0) {
        cells.push(`${r}${c}`)
      }
    })
    return cells
  }, [])

  const randomIndex = emptyCells.length === 1 ? false : Math.floor(x * emptyCells.length)
  return randomIndex === false ? false : emptyCells[randomIndex]
}

const addCell = (strIndex) => {
  if (strIndex) {
    const NEW_VALUE = 2
    const row = strIndex[0]
    const col = strIndex[1]
    game.desk[row][col] = NEW_VALUE
    const deskContainer = document.getElementById('desk-container')
    const cell = document.createElement('div')
    cell.className = `cell flex-center-center`
    cell.setAttribute('data-xy', `${row}${col}`)
    cell.innerHTML = `
        <div class="cell-core flex-center-center">
          ${NEW_VALUE}
        </div>
    `
    deskContainer.insertAdjacentElement('afterbegin', cell)
    setTimeout(() => {
      cell.classList.add('cell_new')
    }, state.animationDuration)
    return
  }
  loose()
}

// const test = () => {
//   const test = document.getElementById('test')
//   const arr = game.desk.reduce((str, row, r) => {
//     return str + `<p>${row.reduce((spans, el, c) => {
//       const cell = document.querySelector(`[data-xy="${r}${c}"]`)
//       let color = el === parseInt(cell?.innerText)
//         ? `; color: green`
//         : `; color: red; backgroundColor: orange`
//       color = el ? color : `; color: black`
//       const style = `display: inline-block`
//       return `${spans}<span style="${style}${color}">${el}</span>`
//     }, '')}</p>`
//   }, '')
//   test.innerHTML = arr
// }

// const handleKeyUp = () => {
//   window.addEventListener('keydown', handleKey)
// }
