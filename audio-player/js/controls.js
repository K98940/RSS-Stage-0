import { state } from './state.js'

export const controlsInit = () => {
  const btnPlay = document.getElementById('btn-play')
  const seeker = document.getElementById('currentTime')
  const volume = document.getElementById('volume')
  const audio = document.getElementById('audio')
  audio.src = state.audio.currentTrack.url

  const timeupdateHandler = () => {
    seeker.value = audio.currentTime
    state.audio.currentTime = audio.currentTime
  }
  audio.addEventListener('timeupdate', timeupdateHandler)

  audio.addEventListener('loadedmetadata', () => {
    seeker.max = Math.floor(audio.duration)
    audio.currentTime = 0
    audio.volume = state.audio.volume
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

  volume.addEventListener('input', () => {
    audio.volume = volume.value / 100
    state.audio.volume = audio.volume
  })


  btnPlay.addEventListener('click', () => {
    state.audio.isPlay = !state.audio.isPlay
  })

  return [audio]
}