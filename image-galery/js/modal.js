export const showMessage = (msg) => {
  const dialog = document.getElementById('dialog')
  const dialogContent = document.getElementById('dialog-content')

  dialogContent.innerText = msg

  dialog.classList.add('dialog__open')
  dialog.addEventListener('close', () => {
    dialog.classList.remove('dialog__open')
  })
  dialog.showModal()
}