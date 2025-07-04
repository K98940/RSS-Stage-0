import { state, playList, initializePlayList } from './state_2.js'
import { controlsInit, convertSecondsToTime, setStyles } from './controls_2.js'

const tracksContainer = document.getElementById('tracks')
const [audio] = controlsInit()

const renderPlayList = (container, playList) => {
  // Убираем автоматическую загрузку всех файлов для получения длительности
  // Длительность будет загружаться по требованию или при первом воспроизведении
  
  const html = playList.map((track, i) => `
      <div class="track">
        <input id="track-${i}" type="radio" ${i === state.audio.currentTrack?.id ? 'checked' : ''} name="track" value="${i}">
        <label for="track-${i}" title="${track.name}">
          <span title="${track.name}">${track.name}</span><span id="track-duration-${i}">--:--</span>
        </label>
      </div>`)
  container.innerHTML = html.join('')
  
  // Добавляем ленивую загрузку длительности при наведении
  addLazyDurationLoading()
}

// Функция для загрузки длительности трека по требованию
const loadTrackDuration = (trackId) => {
  const track = playList[trackId]
  if (!track) return
  
  const durationElement = document.getElementById(`track-duration-${trackId}`)
  if (!durationElement || durationElement.innerText !== '--:--') return
  
  const a = new Audio()
  a.src = track.url
  a.addEventListener('loadedmetadata', () => {
    const duration = convertSecondsToTime(a.duration)
    if (durationElement) {
      durationElement.innerText = duration
    }
  })
  a.addEventListener('error', () => {
    if (durationElement) {
      durationElement.innerText = '00:00'
    }
  })
}

// Функция для ленивой загрузки длительности при наведении
const addLazyDurationLoading = () => {
  const trackLabels = document.querySelectorAll('.track label')
  
  trackLabels.forEach((label, index) => {
    let timeoutId = null
    
    label.addEventListener('mouseenter', () => {
      // Загружаем длительность через небольшую задержку при наведении
      timeoutId = setTimeout(() => {
        loadTrackDuration(index)
      }, 500) // 500ms задержка
    })
    
    label.addEventListener('mouseleave', () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    })
  })
}

const setCurrentTrack = () => {
  if (state.audio.currentTrack) {
    audio.src = state.audio.currentTrack.url
    setStyles(state.audio.currentTrack)
    
    // Загружаем длительность текущего трека
    loadTrackDuration(state.audio.currentTrack.id)
  }
}

tracksContainer.addEventListener('click', (e) => {
  if (e.target.name !== 'track') return
  const track = e.target.value
  state.audio.currentTrack = playList[track]
  setCurrentTrack()
})

// Функция инициализации приложения
async function initializeApp() {
  try {
    // Загружаем плейлист с сервера
    await initializePlayList()
    
    // Устанавливаем первый трек как текущий
    if (playList.length > 0) {
      state.audio.currentTrack = playList[0]
    }
    
    // Инициализируем интерфейс
    if (state.audio.currentTrack) {
      setStyles(state.audio.currentTrack)
      setCurrentTrack()
    }
    
    renderPlayList(tracksContainer, playList)
    
    console.log('Приложение успешно инициализировано с плейлистом с сервера')
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error)
  }
}

// Заменяем window.onload на асинхронную инициализацию
window.onload = initializeApp
