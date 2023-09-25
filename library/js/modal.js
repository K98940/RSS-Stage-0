const CLASS_CLOSE = ['modalcontainer', 'modal-btnclose']

export const removeExistModal = () => {
  const modal = document.querySelector('.modalcontainer')
  if (modal) modal.remove()
}


export const createModalContainer = (component, options = { shadow: false }) => {

  const handleModalClick = (e) => {
    const { classList } = e.target

    classList.forEach(clas => {
      if (CLASS_CLOSE.includes(clas)) {
        container.remove()
      }
    })
  }


  // const dialog = document.createElement('dialog')
  // dialog.innerText = 'DIALOG'
  // document.body.append(dialog)
  // dialog.showModal()



  const container = document.createElement('div')
  const wrapper = document.createElement('div')
  const btnClose = document.createElement('button')


  container.className = 'modalcontainer'
  wrapper.className = 'modalwrapper'
  options.shadow && wrapper.classList.add('__shadow')
  btnClose.className = 'modal-btnclose'

  removeExistModal()
  document.body.append(container)
  container.append(wrapper)
  wrapper.append(btnClose)

  component && wrapper.append(component())


  const focusedElement = document.querySelector('[focus]')
  focusedElement && focusedElement.focus()

  container.addEventListener('click', handleModalClick)
}



export const showMessage = (msg, seconds, elem, err) => {
  const coord = elem?.getBoundingClientRect() || document.querySelector('.modalwrapper').getBoundingClientRect()
  const existMessage = document.querySelector('.modal-popup-mesage')
  existMessage && existMessage.remove()

  const div = document.createElement('div')
  div.className = 'modal-popup-mesage'
  err && div.classList.add('popup-mesage__error')
  div.innerText = msg
  div.style.left = `${coord.left + 20}px`
  div.style.top = `${coord.bottom + 20}px`
  document.body.append(div)
  setTimeout(() => {
    div.classList.add('modal-popup-mesage__show')
    div.style.height = `${div.getBoundingClientRect().height}px`
    div.style.width = `${div.getBoundingClientRect().width}px`
    setTimeout(() => {
      div.style.left = `9999px`
      setTimeout(() => {
        div && div.remove()
      }, 500);
    }, seconds * 1000)
  }, 0)
}
