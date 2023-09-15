import { state } from './state.js'
import { controlsInit } from './controls.js'

const tracks = document.getElementById('tracks')
const [audio] = controlsInit()

tracks.addEventListener('click', (e) => {
  if (e.target.name !== 'track') return
  const track = e.target.value
  state.audio.currentTrack = `./assets/audio/${track}.mp3`
  audio.src = state.audio.currentTrack
})