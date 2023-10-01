import { state } from './state.js'

export const showMessage = (msg, form = false) => {
  const dialog = document.getElementById('dialog')
  dialog.classList.remove('dialog__open')
  dialog.close()
  const dialogContent = document.getElementById('dialog-content')
  const inputNickname = document.getElementById('input-nickname')

  if (form) {
    inputNickname.style.display = 'inline-block'
    inputNickname.focus()
    dialog.addEventListener('cancel', handleDialog)
    dialog.addEventListener('close', handleDialog)
  } else {
    inputNickname.style.display = 'none'
  }


  dialogContent.innerText = msg

  dialog.classList.add('dialog__open')
  dialog.addEventListener('close', () => {
    dialog.classList.remove('dialog__open')
  })
  dialog.showModal()
}

const handleDialog = (e) => {
  const inputNickname = document.getElementById('input-nickname')
  const nick = inputNickname.value.trim()
  state.nickname = nick.length === 0 ? 'anonymous' : nick
}