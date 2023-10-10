import { state } from './state.js'
import { showMessage } from './message.js'
import { loadLocalStorage } from './handleState.js'
import { handleKey } from './handleKey.js'

const randomLevel = Math.floor(Math.random() * 1.9)
state.level = randomLevel
const rangeLevel = document.getElementById('range-level')
const hint = document.getElementById('hint')
const volume = document.getElementById('volume')
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

volume.addEventListener('input', () => {
  state.sound.volume = volume.valueAsNumber
  document.querySelector('.desk-container').focus()
})

volume.addEventListener('change', () => {
  document.querySelector('.desk-container').focus()
})

const init = () => {
  if (!loadLocalStorage()) {
    state.gameLevel = rangeLevel.valueAsNumber
    state.score = 0
    state.maxScore = 2048
    showMessage(state.intro, true)
  } else {
    window.addEventListener('keydown', handleKey)
  }
  const body = document.body
  volume.value = state.sound.volume
  body.setAttribute('level', state.level)
}

window.onload = init()

hint.addEventListener('change', () => {
  state.hint = hint.checked
  document.querySelector('.desk-container').focus()
})

console.warn(state.intro, 'color: black; font-size: larger', 'color: red; font-size: larger', 'color: black; font-size: larger')

// ДОБАВИТЬ РЕГУЛЯТОР ГРОМКОСТИ
// ДОБАВИТЬ ПОДДЕРЖКУ ТАЧПАДА