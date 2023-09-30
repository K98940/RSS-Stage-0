import { state, game } from './state.js'

export const handleKey = ({ code }) => {

  const moveCellsToRight = () => {
    game.desk.forEach((row, row_i) => {
      for (let col_i = row.length - 2; col_i >= 0; col_i--) {
        if (row[col_i] > 0) {
          const div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row_i}${col_i + 1}"]`)

          console.log('div :>> ', div);
          console.log('cellsMustDie :>> ', cellsMustDie);

          const isIdenticalCells = row[col_i + 1] === row[col_i]
          if (isIdenticalCells && cellsMustDie) {
            stepScore += row[col_i]

            // cellsMustDie.forEach(c => c.classList.add('cell_die'))
            cellsMustDie.remove()

            row[col_i + 1] = row[col_i] * 2
            row[col_i] = 0
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
          const div = document.querySelector(`[data-xy="${row_i}${col_i}"]`)
          const cellsMustDie = document.querySelector(`[data-xy="${row_i}${col_i - 1}"]`)

          console.log('div :>> ', div);
          console.log('cellsMustDie :>> ', cellsMustDie);

          const isIdenticalCells = row[col_i - 1] === row[col_i]
          if (isIdenticalCells && cellsMustDie) {
            stepScore += row[col_i]

            // cellsMustDie.forEach(c => c.classList.add('cell_die'))
            cellsMustDie.remove()

            row[col_i - 1] = row[col_i] * 2
            row[col_i] = 0
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

            // cellsMustDie.forEach(c => c.classList.add('cell_die'))
            cellsMustDie.remove()

            desk[row + 1][col] = desk[row][col] * 2
            div.firstElementChild.innerText = desk[row + 1][col]
            desk[row][col] = 0

          } else if (desk[row + 1][col] === 0) {
            desk[row + 1][col] = desk[row][col]
            desk[row][col] = 0
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

            // cellsMustDie.forEach(c => c.classList.add('cell_die'))
            cellsMustDie.remove()

            desk[row - 1][col] = desk[row][col] * 2
            div.firstElementChild.innerText = desk[row - 1][col]
            desk[row][col] = 0

          } else if (desk[row - 1][col] === 0) {
            desk[row - 1][col] = desk[row][col]
            desk[row][col] = 0
          } else continue

          div.dataset.xy = `${row - 1}${col}`
        }
      }
    }
    // for (let row = 1; row < desk.length; row++) {
    //   for (let col = 0; col < desk.length; col++) {
    //     if (desk[row][col] > 0) {
    //       let div = document.querySelector(`[data-xy="${row}${col}"]`)
    //       const isIdenticalCells = desk[row - 1][col] === desk[row][col]
    //       if (isIdenticalCells) {
    //         stepScore += desk[row][col]
    //         desk[row - 1][col] = desk[row][col] * 2
    //         desk[row][col] = 0

    //         div.remove()
    //         div = document.querySelector(`[data-xy="${row - 1}${col}"]`)
    //         div.firstElementChild.innerText = desk[row - 1][col]
    //       } else if (desk[row - 1][col] === 0) {
    //         desk[row - 1][col] = desk[row][col]
    //         desk[row][col] = 0
    //       } else continue

    //       div.dataset.xy = `${row - 1}${col}`
    //     }
    //   }
    // }
  }

  window.removeEventListener('keydown', handleKey)
  // window.addEventListener('keyup', handleKeyUp)
  const { desk } = game
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

  deleteDiedCells()
  addCell(getRandomIndex())
  test()

  setTimeout(() => {
    window.addEventListener('keydown', handleKey)
  }, state.animationDuration)

}

const test = () => {
  game.desk.forEach((row, r) => row.forEach((cell, c) => {
    if (cell > 0) {
      const div = document.querySelectorAll(`[data-xy="${r}${c}"]`)
      if (div.length !== 1) {
        console.warn('div :>> ', div);
        console.warn(cell);
      }
    }
  }))

  const test = document.getElementById('test')
  const arr = game.desk.reduce((str, row, r) => {
    return str + `<p>${row.reduce((spans, el, c) => {
      const cell = document.querySelector(`[data-xy="${r}${c}"]`)
      let color = el === parseInt(cell?.innerText)
        ? `; color: green`
        : `; color: red; backgroundColor: orange`
      color = el ? color : `; color: black`
      const style = `display: inline-block`
      return `${spans}<span style="${style}${color}">${el}</span>`
    }, '')}</p>`
  }, '')
  test.innerHTML = arr
}

const handleKeyUp = () => {
  window.addEventListener('keydown', handleKey)
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

  const randomIndex = emptyCells.length === 0 ? false : Math.floor(x * emptyCells.length)
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
    return
  }
  alert('game over')
}

const deleteDiedCells = () => {
  const cellsMustDie = document.querySelectorAll(`.cell_die`)
  cellsMustDie.forEach(c => c.remove())
}