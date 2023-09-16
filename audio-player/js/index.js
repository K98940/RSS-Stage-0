import { state, playList } from './state.js'
import { controlsInit, convertSecondsToTime, setStyles } from './controls.js'

const tracksContainer = document.getElementById('tracks')
const [audio] = controlsInit()

const renderPlayList = (container, playList) => {
  const renderTracksDuration = async () => {
    playList.forEach(track => {
      const a = new Audio()
      a.src = track.url
      a.addEventListener('loadedmetadata', () => {
        const duration = convertSecondsToTime(a.duration)
        document.getElementById(`track-duration-${track.id}`).innerText = duration
      })
    });
  }
  const html = playList.map((track, i) => `
      <div class="track">
        <input id="track-${i}" type="radio" ${i === 0 ? 'checked' : ''} name="track" value="${i}">
        <label for="track-${i}" title="${track.name}">
          <span title="${track.name}">${track.name}</span><span id="track-duration-${i}"></span>
        </label>

      </div>`)
  container.innerHTML = html.join('')
  renderTracksDuration()
}

const setCurrentTrack = (e) => {
  const track = e.target.value
  state.audio.currentTrack = playList[track]
  audio.src = state.audio.currentTrack.url
  setStyles(playList[track])
}

tracksContainer.addEventListener('click', (e) => {
  if (e.target.name !== 'track') return
  setCurrentTrack(e)
})

window.onload = () => {
  setStyles(playList[0])
  renderPlayList(tracksContainer, playList)
}