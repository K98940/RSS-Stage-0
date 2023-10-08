import { game, state } from "./state.js"

export const renderDesk = () => {
  const addCell = (value, x, y) => {
    const hintValue = state.hint ? value : ''
    const htmlCell = `
    <div class="cell flex-center-center cell_new" data-xy="${x}${y}" data-value="${value}" data-level="${state.level}">
      <div class="cell-core flex-center-center">
        ${hintValue}
      </div>
    </div>
    `
    deskContainer.innerHTML += htmlCell
  }

  const deskContainer = document.getElementById('desk-container')
  const scoreMax = document.getElementById('score-max')
  deskContainer.innerHTML = ''
  scoreMax.innerText = state.maxScore

  game.desk.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell > 0) {
        addCell(cell, i, j)
      }
    })
  });

}