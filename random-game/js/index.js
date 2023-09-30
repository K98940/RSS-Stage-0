import { state } from './state.js'
import { handleKey } from './handleKey.js'

const rangeLevel = document.getElementById('range-level')
const btnDel = document.getElementById('btn-del')
// const css = window.getComputedStyle(document.body)
document.body.style.setProperty('--animation-duration', `${state.animationDuration}ms`)
document.body.style.setProperty('--cell-size', `${state.cellSize}rem`)
document.body.style.setProperty('--level', state.gameLevel)

rangeLevel.addEventListener('input', () => {
  state.gameLevel = rangeLevel.valueAsNumber
})

btnDel.addEventListener('click', () => { })


const init = () => {
  state.gameLevel = rangeLevel.valueAsNumber
  state.score = 0
}

window.onload = init()
window.addEventListener('keydown', handleKey)