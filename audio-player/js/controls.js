import { state } from './state.js'

export const controlsInit = () => {
  const btnPlay = document.getElementById('btn-play')
  const seeker = document.getElementById('currentTime')
  const audio = document.getElementById('audio')
  audio.src = state.audio.currentTrack

  const timeupdateHandler = () => {
    seeker.value = audio.currentTime
    state.audio.currentTime = audio.currentTime
  }
  audio.addEventListener('timeupdate', timeupdateHandler)

  audio.addEventListener('loadedmetadata', () => {
    seeker.max = Math.floor(audio.duration)
    audio.currentTime = 0
    seeker.value = 0
    if (state.audio.isPlay) audio.play()
  })

  seeker.addEventListener('input', () => {
    audio.pause()
    audio.currentTime = seeker.value
  })

  seeker.addEventListener('change', () => {
    if (state.audio.isPlay) audio.play()
    audio.currentTime = seeker.value
    state.audio.currentTime = audio.currentTime
  })

  btnPlay.addEventListener('click', () => {
    state.audio.isPlay = !state.audio.isPlay
  })

  return [seeker, audio]
}