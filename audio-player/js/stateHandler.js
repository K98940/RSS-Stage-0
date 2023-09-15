const audio = document.getElementById('audio')
const btnPlay = document.getElementById('btn-play')

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
          btnPlay.classList.add('btn-play__played')
        }
        else {
          audio.pause()
          btnPlay.classList.remove('btn-play__played')
        }
        break;

      default:
        break;
    }
    return true
  },
}