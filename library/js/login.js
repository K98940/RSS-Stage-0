import * as modal from './modal.js'
import * as profile from './profile.js'
import * as register from './register.js'

export const createLoginDialog = () => {

  const hanlerBtn = (e) => {
    e.preventDefault()
    const modalcontainer = document.querySelector('.modalcontainer')
    const inputs = FieldsWrapper.querySelectorAll('input')

    let error = 0
    inputs.forEach(input => {
      if (!input.validity.valid) {
        input.classList.add('dialog__bad-input')
        error++
      } else {
        input.classList.remove('dialog__bad-input')
      }
    })
    if (error) return

    let account = profile.checkLogin({ email: inputs[0].value, password: inputs[1].value })
    if (account) {
      profile.setLoginedUser(account)
      profile.setProfileIcon()
      modalcontainer.remove()
      return
    }
    account = profile.checkLogin({ cardNumber: inputs[0].value, password: inputs[1].value })
    if (account) {
      profile.setLoginedUser(account)
      profile.setProfileIcon()
      modalcontainer.remove()
      return
    }
    modal.showMessage('Пользователь с такими данными не найден 🥺', 3, e.target, true)
  }

  const handleLink = () => {
    modal.createModalContainer(register.createRegisterDialog)
  }


  const fields = {
    'E-mail or readers card': 'text',
    'Password': 'password',
  }
  const wrapper = document.createElement('div')
  const header = document.createElement('div')
  const form = document.createElement('form')
  const FieldsWrapper = document.createElement('div')
  const dialogBtn = document.createElement('button')
  const footer = document.createElement('div')
  const link = document.createElement('span')

  wrapper.className = 'dialog-wrapper'
  header.className = 'dialog-header'
  FieldsWrapper.className = 'dialog-fields-wrapper'
  dialogBtn.className = 'dialog-btn'
  footer.className = 'dialog-footer'
  link.className = 'dialog-footer-link'
  header.innerText = 'Login'
  dialogBtn.innerText = 'Log In'
  dialogBtn.setAttribute('tabindex', '3')
  link.innerText = 'Register'

  wrapper.append(header)
  wrapper.append(form)
  form.append(FieldsWrapper)
  Object.entries(fields).forEach((field, index) => {
    const div = document.createElement('div')
    div.className = 'dialog-field'
    div.innerHTML = `<label class="dialog-label" for="${index}">${field[0]}</label>
  <input type="${field[1]}" id="input${index}" required  autocomplete="on" ${index === 0 ? 'focus' : ''}  tabindex="${index + 1}"
  pattern=".{1,}"'} >`
    FieldsWrapper.append(div)
  })
  form.append(dialogBtn)
  footer.innerHTML = `<span class="dialog-footer-title" data-role="Register">Don’t have an account?</span>`
  wrapper.append(footer)
  footer.append(link)

  dialogBtn.addEventListener('click', hanlerBtn)
  link.addEventListener('click', handleLink)

  return wrapper
}
