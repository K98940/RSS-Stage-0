import * as state from './state.js'
import * as info from './info.js'
import * as modal from './modal.js'

export const createMyProfile = () => {

  const container = document.createElement('div')
  const leftSide = document.createElement('div')
  const rightSide = document.createElement('div')
  const wrapperInfo = document.createElement('div')
  const userInfo = info.createInfoDiv(state.users.loginedUser)
  const rentedBook = info.createRentedDiv(state.users.loginedUser)
  const cardNumber = document.createElement('div')

  const NAME_LENGTH_LIMIT = 12
  const initials = `${state.users.loginedUser.firstName[0]}${state.users.loginedUser.lastName[0]}`
  const userFirstName = state.users.loginedUser.firstName.length > NAME_LENGTH_LIMIT
    ? `${state.users.loginedUser.firstName.slice(0, NAME_LENGTH_LIMIT)}...`
    : state.users.loginedUser.firstName
  const userLastName = state.users.loginedUser.lastName.length > NAME_LENGTH_LIMIT
    ? `${state.users.loginedUser.lastName.slice(0, NAME_LENGTH_LIMIT)}...`
    : state.users.loginedUser.lastName

  container.className = 'myprofile-container'
  leftSide.className = 'myprofile-leftside'
  rightSide.className = 'myprofile-rightside'
  wrapperInfo.className = 'myprofile-rightside-wrapperinfo'

  leftSide.innerHTML = `
  <div class="myprofile-leftside-avatar">${initials}</div>
  <div class="myprofile-leftside-username">${userFirstName} ${userLastName}</div>
  `
  rightSide.innerHTML = `
  <div class="myprofile-rightside-title">My profile</div>
  `
  cardNumber.innerHTML = `
  <div class="myprofile-card-number">Card number
  <span>${state.users.loginedUser.cardNumber}</span>
  <img src="./assets/icon/copy.svg" title="copy number" alt="copy">
  </div>
  `


  container.append(leftSide)
  container.append(rightSide)
  rightSide.append(wrapperInfo)
  wrapperInfo.append(userInfo)
  rightSide.append(rentedBook)
  rightSide.append(cardNumber)

  const img = cardNumber.querySelector('img')
  cardNumber.querySelector('img').addEventListener('click', () => handleCopyToBuffer(img))

  return container
}

const handleCopyToBuffer = (elem) => {
  navigator.clipboard.writeText(state.users.loginedUser.cardNumber)
  modal.showMessage(`скопировано ${state.users.loginedUser.cardNumber}`, 2, elem)
}