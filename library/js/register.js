import * as modal from './modal.js'
import * as profile from './profile.js'
import * as login from './login.js'

export const createRegisterDialog = () => {

  const hanlerBtn = (e) => {
    e.preventDefault()

    const { type, key } = e
    if (type === 'keypress' & (key != 'Enter' || key != 'Esc')) return

    const modalcontainer = document.querySelector('.modalcontainer')
    const inputs = FieldsWrapper.querySelectorAll('input')

    let error = 0
    inputs.forEach(input => {
      if (!input.validity.valid) {
        input.classList.add('dialog__bad-input')
        modal.showMessage(input.validationMessage, 3, input, true)
        error++
      } else {
        input.classList.remove('dialog__bad-input')
      }
    })
    if (error) {
      return
    }

    const account = profile.makeAccount(inputs)
    if (profile.addRegisteredUser(account)) {
      profile.setLoginedUser(account)
      profile.setProfileIcon()
      modalcontainer.remove()
    }
  }

  const handleLink = () => {
    modal.createModalContainer(login.createLoginDialog)
  }



  const fields = {
    'First name': 'text',
    'Last name': 'text',
    'E-mail': 'email',
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
  header.innerText = 'Register'
  dialogBtn.innerText = 'Sign Up'
  dialogBtn.setAttribute('tabindex', '5')
  link.innerText = 'Login'

  wrapper.append(header)
  wrapper.append(form)
  form.append(FieldsWrapper)
  Object.entries(fields).forEach((field, index) => {
    const div = document.createElement('div')
    div.className = 'dialog-field'
    div.innerHTML = `<label class="dialog-label" for="${index}">${field[0]}</label>
  <input type="${field[1]}" id="input${index}" required autocomplete="on" ${index === 0 ? 'focus' : ''}  tabindex="${index + 1}"
  ${field[1] === 'password' ? ' pattern=".{8,}" title="minimum of 8 characters"' : ' pattern=".{1,}" title="should not be empty"'} >`
    FieldsWrapper.append(div)
  })
  form.append(dialogBtn)
  footer.innerHTML = `<span class="dialog-footer-title" data-role="logIn">Already have an account?`
  wrapper.append(footer)
  footer.append(link)

  dialogBtn.addEventListener('click', hanlerBtn)
  link.addEventListener('click', handleLink)

  return wrapper
}
