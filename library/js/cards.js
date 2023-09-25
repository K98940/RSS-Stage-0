import * as state from './state.js'

export const renderCardContent = (Container) => {
  const textContent = state.users.loginedUser ?
    'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.'
    : 'You will be able to see a reader card after logging into account or you can register a new account'
  const textTitle = state.users.loginedUser ? 'Visit your profile' : 'Get a reader card'
  const container = document.querySelector(Container)
  const cardContent = document.createElement('div')
  const cardButtonsWrapper = document.createElement('div')
  const cardBtnRegister = document.createElement('button')
  const cardBtnLoginProfile = document.createElement('button')

  cardContent.className = 'get-card-content'
  cardButtonsWrapper.className = 'get-card-buttons-wrapper'
  cardBtnRegister.className = 'get-card-btn'
  cardBtnLoginProfile.className = 'get-card-btn'

  cardBtnRegister.dataset.role = 'Register'
  cardBtnRegister.setAttribute('tabindex', '-1')
  cardBtnLoginProfile.setAttribute('tabindex', '-1')
  cardBtnLoginProfile.dataset.role = state.users.loginedUser ? 'myProfile' : 'logIn'

  container.innerHTML = `<div class="get-card-title">${textTitle}</div>`
  cardContent.innerHTML = `<p>${textContent}</p>`
  cardBtnRegister.innerText = 'Sign Up'
  cardBtnLoginProfile.innerText = state.users.loginedUser ? 'Profile' : 'Log in'


  state.users.loginedUser || cardButtonsWrapper.append(cardBtnRegister)
  cardButtonsWrapper.append(cardBtnLoginProfile)
  container.append(cardContent)
  container.append(cardButtonsWrapper)
}