import { state } from './state.js'

const audio = document.getElementById('audio')
const btnPlay = document.getElementById('btn-play')
const progress = document.getElementById('currentTime')
audio.src = state.audio.currentTrack

const timeupdateHandler = () => {
  progress.value = audio.currentTime
}

audio.addEventListener('timeupdate', timeupdateHandler)

progress.addEventListener('input', () => {
  audio.pause()
  audio.currentTime = progress.value
})

progress.addEventListener('change', () => {
  if (state.audio.isPlay) audio.play()
  audio.currentTime = progress.value
})

audio.addEventListener('loadedmetadata', () => {
  progress.max = Math.floor(audio.duration)
})

btnPlay.addEventListener('click', () => {
  state.audio.isPlay = !state.audio.isPlay
})

window.onload = () => {
  audio.currentTime = 0
  progress.value = 0
}