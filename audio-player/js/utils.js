/**
 * @param {number} max - максимальное возвращаемое значение (включительно)
 * @returns {number} Случайное число от 0 до max
 */
export function getRandomIndex(max) {
  return Math.floor(Math.random() * (max + 1));
}

/**
 * Функция для автоматического скролла к текущему треку
 * @param {number} trackID - ID текущего трека
 */
export function scrollToTrack(trackID) {
  const tracksContainer = document.getElementById('tracks')
  const currentTrackElement = tracksContainer.querySelector(`input[id="track-${trackID}"]`)
  
  if (!currentTrackElement) return
  
  // Получаем родительский элемент трека
  const trackElement = currentTrackElement.closest('.track')
  if (!trackElement) return
  
  // Вычисляем позицию для скролла
  const containerRect = tracksContainer.getBoundingClientRect()
  const trackRect = trackElement.getBoundingClientRect()
  
  // Проверяем, видим ли трек в контейнере
  const isVisible = (
    trackRect.top >= containerRect.top &&
    trackRect.bottom <= containerRect.bottom
  )
  
  // Если трек не видим, скроллим к нему
  if (!isVisible) {
    // Вычисляем позицию скролла
    const scrollTop = trackElement.offsetTop - tracksContainer.offsetTop - (containerRect.height / 2) + (trackRect.height / 2)
    
    // Плавный скролл к треку
    tracksContainer.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: 'smooth'
    })
  }
} 
