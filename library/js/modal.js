const CLASS_CLOSE = ['modalcontainer', 'modal-btnclose']

export const createModalContainer = (component, options = {
}) => {

  const handleModalClick = (e) => {
    const { classList } = e.target

    classList.forEach(clas => {
      if (CLASS_CLOSE.includes(clas)) {
        container.remove()
      }
    })
  }

  const container = document.createElement('div')
  const wrapper = document.createElement('div')
  const btnClose = document.createElement('button')


  container.className = 'modalcontainer'
  wrapper.className = 'modalwrapper'
  btnClose.className = 'modal-btnclose'

  document.body.append(container)
  container.append(wrapper)
  wrapper.append(btnClose)
  component && wrapper.append(component())
  const focusedElement = document.querySelector('[autofocus]')
  focusedElement && focusedElement.focus()

  container.addEventListener('click', handleModalClick)
}