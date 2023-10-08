import { state } from './state.js'
import { handleKey } from './handleKey.js'
import { showMessage } from './message.js'
import { loadLocalStorage } from './handleState.js'

const rangeLevel = document.getElementById('range-level')
const hint = document.getElementById('hint')
document.body.style.setProperty('--animation-duration', `${state.animationDuration}ms`)
document.body.style.setProperty('--level', state.gameLevel)

rangeLevel.addEventListener('input', () => {
  state.cellSize = 12 / rangeLevel.valueAsNumber
  state.gameLevel = rangeLevel.valueAsNumber
})

const init = () => {
  if (!loadLocalStorage()) {
    state.gameLevel = rangeLevel.valueAsNumber
    state.score = 0
    state.maxScore = 2048
    showMessage('Для проверяющих наверху есть переключатель для упрощения тестирования. Он уменьшает количество очков необходимых для победы', true)
  }
  const body = document.body
  body.setAttribute('level', state.level)
}

window.onload = init()
window.addEventListener('keydown', handleKey)
hint.addEventListener('change', () => { state.hint = hint.checked })