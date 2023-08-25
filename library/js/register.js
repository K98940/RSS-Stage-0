import * as state from './state.js'
import * as profile from './profile.js'

export const createRegisterDialog = () => {

  const hanlerSignUp = (e) => {
    const { type, key } = e
    const modalcontainer = document.querySelector('.modalcontainer')
    const inputs = registerFieldWrapper.querySelectorAll('input')

    // if (type === 'keypress' & key != 'Enter') return

    let error = 0
    inputs.forEach(input => {
      if (!input.validity.valid) {
        input.classList.add('register__bad-input')
        error++
      } else {
        input.classList.remove('register__bad-input')
      }
    })
    if (error) return


    if (profile.addRegisteredUser(inputs)) {
      profile.setLoginedUser(inputs)
      profile.setProfileIcon()
      modalcontainer.remove()
    }
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
  const registerFieldWrapper = document.createElement('div')
  const btnSignUp = document.createElement('button')
  const footer = document.createElement('div')

  wrapper.className = 'register-wrapper'
  header.className = 'register-header'
  registerFieldWrapper.className = 'register-field-wrapper'
  btnSignUp.className = 'register-btn-signup'
  footer.className = 'register-footer'
  header.innerText = 'Register'
  btnSignUp.innerText = 'Sign Up'

  wrapper.append(header)
  wrapper.append(form)
  form.append(registerFieldWrapper)
  Object.entries(fields).forEach((field, index) => {
    const div = document.createElement('div')
    div.className = 'register-field'
    div.innerHTML = `<label class="register-label" for="${index}">${field[0]}</label>
  <input type="${field[1]}" id="input${index}" required autocomplete="off" ${index === 0 ? 'autofocus' : ''}  tabindex="${index + 1}"
  ${field[1] === 'password' ? ' pattern=".{8,}" title="minimum of 8 characters"' : ' pattern=".{1,}"'} >`
    registerFieldWrapper.append(div)
  })
  form.append(btnSignUp)
  footer.innerHTML = `<span class="register-footer-title">Already have an account?</span>
  <span class="register-footer-link">Login</span>`
  wrapper.append(footer)

  btnSignUp.addEventListener('click', hanlerSignUp)
  // wrapper.addEventListener('keypress', hanlerSignUp)

  return wrapper
}
