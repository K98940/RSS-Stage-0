import { state } from './state.js'
import { showMessage } from './message.js'
import { loadLocalStorage } from './handleState.js'
import { handleKey, touchStart, touchEnd } from './handleKey.js'

const randomLevel = Math.floor(Math.random() * 1.9)
state.level = randomLevel
const rangeLevel = document.getElementById('range-level')
const iconGame = document.getElementById('icon-game')
const iconTest = document.getElementById('icon-test')
const hint = document.getElementById('hint')
const volume = document.getElementById('volume')
document.body.style.setProperty('--animation-duration', `${state.animationDuration}ms`)
document.body.style.setProperty('--level', state.gameLevel)

iconGame.addEventListener('click', () => {
  state.gameLevel = 4
  rangeLevel.value = 4
})

iconTest.addEventListener('click', () => {
  state.gameLevel = 5
  rangeLevel.value = 5
})

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

hint.addEventListener('change', () => {
  state.hint = hint.checked
  document.querySelector('.desk-container').focus()
})

window.addEventListener('touchstart', touchStart)
window.addEventListener('touchend', touchEnd)

window.onload = init()
console.warn(state.intro, 'color: black; font-size: larger', 'color: red; font-size: larger', 'color: black; font-size: larger')