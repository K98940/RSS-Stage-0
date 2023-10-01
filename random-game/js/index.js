import { state } from './state.js'
import { handleKey } from './handleKey.js'
import { showMessage } from './message.js'
import { renderScoreBoard } from './handleState.js'

const rangeLevel = document.getElementById('range-level')
document.body.style.setProperty('--animation-duration', `${state.animationDuration}ms`)
document.body.style.setProperty('--level', state.gameLevel)

rangeLevel.addEventListener('input', () => {
  state.cellSize = 12 / rangeLevel.valueAsNumber
  state.gameLevel = rangeLevel.valueAsNumber
})

const init = () => {
  state.gameLevel = rangeLevel.valueAsNumber
  state.score = 0
  renderScoreBoard()
  showMessage('Для проверяющих есть упрощенный режим для тестирования', true)
}

window.onload = init()
window.addEventListener('keydown', handleKey)

// С ИНТЕРВАЛОМ СКАЧИВАТЬ РАНДОМ КАРТИНКУ С АНСПЛЭШ И СТАВИТЬ ФОНОМ
// СТОР ДЛЯ ХРАНЕНИЯ НИКА