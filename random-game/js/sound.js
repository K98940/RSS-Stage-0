import { state } from './state.js'

export const playPointsUp = (points) => {
  if (state.sound.isReveal[points]) return

  const sound = new Audio()
  sound.volume = state.sound.volume
  state.sound.isReveal[points] = true

  const src = state.sound.src
  sound.src = `${src}${state.level}/0.mp3`
  sound.play()
}