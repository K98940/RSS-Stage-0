import { state } from './state.js'
import { handleKey } from './handleKey.js'
import { showMessage } from './message.js'
import { loadLocalStorage } from './handleState.js'

const rangeLevel = document.getElementById('range-level')
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
    showMessage('Для проверяющих в правом верхнем углу есть переключатель для упрощения тестирования', true)
  }
}

window.onload = init()
window.addEventListener('keydown', handleKey)

// НА УДАЛЯЕМЫЙ БЛОК ПОВЕСТЬ АНИМАЦИЮ - ЗАГЛУШКУ
// С ИНТЕРВАЛОМ СКАЧИВАТЬ РАНДОМ КАРТИНКУ С АНСПЛЭШ И СТАВИТЬ ФОНОМ
// СТИЛИЗОВАТЬ СЛАЙДЕР