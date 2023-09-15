import { state, playList } from './state.js'

const convertSecondsToTime = (sec) => {
  const min = Math.floor(sec / 60)
  const s = Math.floor(sec - (min * 60))
  const minTxt = min.toString(10).padStart(2, '0')
  const sTxt = s.toString(10).padStart(2, '0')

  return `${minTxt}:${sTxt}`
}

const setNextTrack = () => {
  const tracksContainer = document.getElementById('tracks')
  let nextTrackID = state.audio.currentTrack.id + 1
  if (nextTrackID > playList.length) {
    nextTrackID = 0
  }
  state.audio.currentTrack = playList[nextTrackID]
  audio.src = state.audio.currentTrack.url

  tracksContainer.querySelector(`input[id="track-${nextTrackID}"]`).setAttribute('checked', '')
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
    if (audio.currentTime >= audio.duration) {
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