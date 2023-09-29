import { game } from "./state.js"

export const renderDesk = () => {
  const addCell = (value, x, y) => {
    const htmlCell = `
    <div class="cell flex-center-center" data-xy="${x}${y}">
      <div class="cell-core flex-center-center">
        ${value}
      </div>
    </div>
    `
    deskContainer.innerHTML += htmlCell
  }

  const deskContainer = document.getElementById('desk-container')
  deskContainer.innerHTML = ''

  game.desk.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell > 0) {
        addCell(cell, i, j)
      }
    })
  });

}