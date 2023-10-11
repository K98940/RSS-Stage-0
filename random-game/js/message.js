import { state } from './state.js'
import { renderScoreBoard } from './handleState.js'
import { handleKey } from './handleKey.js'

export const showMessage = (msg, form = false) => {

  window.removeEventListener('keydown', handleKey)
  const dialog = document.getElementById('dialog')
  dialog.classList.remove('dialog__open')
  dialog.close()
  const dialogContent = document.getElementById('dialog-content')
  const inputNickname = document.getElementById('input-nickname')
  const dialogImg = document.querySelector('.dialog-img')

  if (form) {
    inputNickname.value = state.nickname === 'anonymous' ? '' : state.nickname
    inputNickname.style.display = 'inline-block'
    dialogImg.style.display = 'block'
    inputNickname.focus()
    dialog.addEventListener('cancel', handleDialog)
    dialog.addEventListener('close', handleDialog)
  } else {
    inputNickname.style.display = 'none'
    dialogImg.style.display = 'none'
  }

  const filteredMsg = msg.replace(/%c/g, '')
  dialogContent.innerText = filteredMsg

  dialog.classList.add('dialog__open')
  dialog.addEventListener('close', () => {
    dialog.classList.remove('dialog__open')
  })
  dialog.showModal()
}

export const showWinMessage = (win = true) => {
  const resetGame = () => {
    state.score = 0
    state.gameLevel = state.gameLevel
    state.sound.isReveal = {
      2: false,
      4: false,
      8: false,
      16: false,
      32: false,
      64: false,
      128: false,
      256: false,
      512: false,
      1024: false,
    }
    renderScoreBoard()
  }

  const getRandomMem = () => {
    const { level } = state
    const totalMemes = state.img[level].length
    const totalMsgs = state.msg.length
    let iMeme = Math.floor(Math.random() * totalMemes)
    let iMsg = Math.floor(Math.random() * totalMsgs)
    iMeme = iMeme > totalMemes - 1 ? totalMemes - 1 : iMeme
    iMsg = iMsg > totalMsgs - 1 ? totalMsgs - 1 : iMsg
    return {
      msg: state.msg[iMsg],
      img: state.img[level][iMeme],
    }
  }

  const { msg, img } = getRandomMem()
  const baseUrl = `./assets/memes/`
  const url = `${baseUrl}${state.level}/${img}`
  const msgHeader = state.score >= state.maxScore ? 'Вы победили!' : 'Вы... почти победили!'
  const dialog = document.getElementById('dialog')
  const inputNickname = document.getElementById('input-nickname')
  const dialogImg = document.querySelector('.dialog-img')
  dialogImg.style.display = 'none'
  window.removeEventListener('keydown', handleKey)
  inputNickname.style.display = 'none'
  dialog.addEventListener('close', () => resetGame())
  dialog.classList.remove('dialog__open')
  dialog.close()
  const dialogContent = document.getElementById('dialog-content')

  const html = `
  <div class="mem-container flex-center-center">
    <img src="${url}" alt="memes">
    <p>
      ${msgHeader}<br>
      ${msg}<br><br>
      Ваш результат: ${state.score}
    </p>
  </div>

  `

  dialogContent.innerHTML = html

  dialog.classList.add('dialog__open')
  dialog.addEventListener('close', () => {
    dialog.classList.remove('dialog__open')
    window.addEventListener('keydown', handleKey)
  })
  dialog.showModal()
}

const handleDialog = (e) => {
  const inputNickname = document.getElementById('input-nickname')
  const nick = inputNickname.value.trim()
  state.nickname = nick.length === 0 ? 'anonymous' : nick
  window.addEventListener('keydown', handleKey)
}