import { state, playList } from './state.js'
import { controlsInit } from './controls.js'

const tracksContainer = document.getElementById('tracks')
const [audio] = controlsInit()

const renderPlayList = (container, playList) => {
  const html = playList.map((track, i) => `
      <div class="track">
        <input id="track-${i}" type="radio" ${i === 0 ? 'checked' : ''} name="track" value="${i}">
        <label for="track-${i}">${track.name}</label>
      </div>`)
  container.innerHTML = html.join('')
}

const setCurrentTrack = (e) => {
  const track = e.target.value
  state.audio.currentTrack = playList[track]
  audio.src = state.audio.currentTrack.url
}

tracksContainer.addEventListener('click', (e) => {
  if (e.target.name !== 'track') return
  setCurrentTrack(e)
})

window.onload = () => {
  renderPlayList(tracksContainer, playList)
}