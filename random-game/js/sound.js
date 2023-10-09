import { state } from './state.js'

const sound = new Audio()
sound.volume = state.sound.volume

export const playPointsUp = (points) => {
  if (state.sound.isReveal[points]) return
  state.sound.isReveal[points] = true

  const src = state.sound.src
  sound.src = `${src}${state.level}/0.mp3`
  sound.play()
}