const audio = document.getElementById('audio')
const btnPlay = document.getElementById('btn-play')
const state = document.getElementById('state')

export const stateHandler = {
  get: (target, key) => {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], stateHandler)
    }

    return target[key]
  },
  set: (target, prop, value) => {
    target[prop] = value
    switch (prop) {
      case 'isPlay':
        if (value) {
          audio.play()
          state.classList.remove('animation__pause')
          btnPlay.classList.add('btn-play__played')
          state.classList.add('animation__play')
        }
        else {
          audio.pause()
          btnPlay.classList.remove('btn-play__played')
          state.classList.remove('animation__play')
          state.classList.add('animation__pause')
        }
        break;

      default:
        break;
    }
    return true
  },
}