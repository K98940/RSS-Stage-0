import { state, playList } from './state.js'

export const convertSecondsToTime = (sec) => {
  const min = Math.floor(sec / 60)
  const s = Math.floor(sec - (min * 60))
  const minTxt = min.toString(10).padStart(2, '0')
  const sTxt = s.toString(10).padStart(2, '0')

  return `${minTxt}:${sTxt}`
}

const setTrack = (toward) => {
  if (state.audio.isPlay) audio.pause()
  const tracksContainer = document.getElementById('tracks')
  let trackID = state.audio.currentTrack.id

  let row = tracksContainer.querySelector(`input[id="track-${trackID}"]`)
  row.checked = false

  if (toward) {
    trackID += 1
    if (trackID >= playList.length) {
      trackID = 0
    }
  } else {
    trackID -= 1
    if (trackID < 0) {
      trackID = playList.length - 1
    }
  }

  row = tracksContainer.querySelector(`input[id="track-${trackID}"]`)
  row.checked = true
  state.audio.currentTrack = playList[trackID]
  audio.src = state.audio.currentTrack.url
  setStyles(playList[trackID])
  if (state.audio.isPlay) audio.play()
}

export const controlsInit = () => {
  const btnPlay = document.getElementById('btn-play')
  const cover = document.querySelector('.container-cover')
  const seeker = document.getElementById('currentTime')
  const volume = document.getElementById('volume')
  const btnForward = document.getElementById('btn-forward')
  const btnBackward = document.getElementById('btn-backward')
  const audio = document.getElementById('audio')
  const timeDuration = document.getElementById('timeDuration')
  const timeCurrent = document.getElementById('timeCurrent')
  audio.src = state.audio.currentTrack.url

  const timeupdateHandler = () => {
    seeker.value = audio.currentTime
    state.audio.currentTime = audio.currentTime
    timeCurrent.innerText = convertSecondsToTime(audio.currentTime)
    if (audio.currentTime >= audio.duration - 1) {
      setTrack(true)
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

  cover.addEventListener('click', () => {
    state.audio.isPlay = !state.audio.isPlay
  })

  btnForward.addEventListener('click', () => {
    setTrack(true)
  })

  btnBackward.addEventListener('click', () => {
    setTrack(false)
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

  let baseLight = track.colorBaseColor.split(',')[2]
  baseLight = baseLight.replace('%', '')
  baseLight = parseInt(baseLight, 10)
  const colorTextControls = baseLight > 60 ? 'black' : 'white'

  root.style.setProperty('--color-text-controls', colorTextControls)
  root.style.setProperty('--color-base-color', track.colorBaseColor)
}