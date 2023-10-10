import { state } from './state.js'
import { handleKey } from './handleKey.js'
import { showMessage } from './message.js'
import { loadLocalStorage } from './handleState.js'

const randomLevel = Math.floor(Math.random() * 1.9)
state.level = randomLevel
const rangeLevel = document.getElementById('range-level')
const hint = document.getElementById('hint')
document.body.style.setProperty('--animation-duration', `${state.animationDuration}ms`)
document.body.style.setProperty('--level', state.gameLevel)

rangeLevel.addEventListener('input', () => {
  state.cellSize = 12 / rangeLevel.valueAsNumber
  state.gameLevel = rangeLevel.valueAsNumber
  document.querySelector('.desk-container').focus()
})
rangeLevel.addEventListener('change', () => {
  document.querySelector('.desk-container').focus()
})

const init = () => {
  if (!loadLocalStorage()) {
    state.gameLevel = rangeLevel.valueAsNumber
    state.score = 0
    state.maxScore = 2048
    showMessage(state.intro, true)
  }
  const body = document.body
  body.setAttribute('level', state.level)
}

window.onload = init()
window.addEventListener('keydown', handleKey)
hint.addEventListener('change', () => {
  state.hint = hint.checked
  document.querySelector('.desk-container').focus()
})

console.warn(state.intro)

// ДОБАВИТЬ РЕГУЛЯТОР ГРОМКОСТИ
// ДОБАВИТЬ ПОДДЕРЖКУ ТАЧПАДА