import { state, playList } from './state.js'

export const convertSecondsToTime = (sec) => {
  const min = Math.floor(sec / 60)
  const s = Math.floor(sec - (min * 60))
  const minTxt = min.toString(10).padStart(2, '0')
  const sTxt = s.toString(10).padStart(2, '0')

  return `${minTxt}:${sTxt}`
}

const setNextTrack = () => {
  audio.pause()
  const tracksContainer = document.getElementById('tracks')
  let trackID = state.audio.currentTrack.id

  let row = tracksContainer.querySelector(`input[id="track-${trackID}"]`)
  row.checked = false

  trackID += 1
  if (trackID >= playList.length) {
    trackID = 0
  }

  row = tracksContainer.querySelector(`input[id="track-${trackID}"]`)
  row.checked = true
  state.audio.currentTrack = playList[trackID]
  audio.src = state.audio.currentTrack.url
  setStyles(playList[trackID])
  audio.play()
}

export const controlsInit = () => {
  const btnPlay = document.getElementById('btn-play')
  const seeker = document.getElementById('currentTime')
  const volume = document.getElementById('volume')
  const audio = document.getElementById('audio')
  const timeDuration = document.getElementById('timeDuration')
  const timeCurrent = document.getElementById('timeCurrent')
  audio.src = state.audio.currentTrack.url

  const timeupdateHandler = () => {
    seeker.value = audio.currentTime
    state.audio.currentTime = audio.currentTime
    timeCurrent.innerText = convertSecondsToTime(audio.currentTime)
    if (audio.currentTime >= audio.duration - 1) {
      setNextTrack()
    }
  }
  audio.addEventListener('timeupdate', timeupdateHandler)

  audio.addEventListener('loadedmetadata', () => {
    seeker.max = Math.floor(audio.duration)
    audio.currentTime = 0
    audio.volume = state.audio.volume
    seeker.value = 0
    timeDuration.innerText = convertSecondsToTime(audio.duration)
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

export const setStyles = (track) => {
  const root = document.querySelector(':root')
  const urlBg = `url("${track.cover}/bg/${track.id}.jpg")`
  const urlCoverBig = `url("${track.cover}/big/${track.id}.jpg")`
  const urlCoverMedium = `url("${track.cover}/medium/${track.id}.jpg")`
  const urlCoverSmall = `url("${track.cover}/small/${track.id}.jpg")`
  const urlBtn = `url(${track.button.url})`

  root.style.setProperty('--cover-bg', urlBg)
  root.style.setProperty('--cover-big', urlCoverBig)
  root.style.setProperty('--cover-medium', urlCoverMedium)
  root.style.setProperty('--cover-small', urlCoverSmall)

  root.style.setProperty('--btn-url', urlBtn)
  root.style.setProperty('--btn-hue', track.button.hue)

  root.style.setProperty('--color-text-controls', track.colorTextControls)

  root.style.setProperty('--color-playlist-text', track.colorPlaylistText)
  root.style.setProperty('--color-bg-playlist', track.colorBgPlaylist)
  root.style.setProperty('--color-bg-playlist-active', track.colorBgPlaylistActive)
  root.style.setProperty('--color-bg-playlist-hover', track.colorBgPlaylistHover)
}