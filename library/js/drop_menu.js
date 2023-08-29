import * as state from './state.js'

export const createMenu = (elem) => {

  const { right, bottom } = elem.getBoundingClientRect()
  const nav = document.querySelector('.wrapper-nav-profile')
  const container = document.createElement('div')
  const wrapper = document.createElement('div')
  const menuItem_1 = document.createElement('div')
  const menuItem_2 = document.createElement('div')

  container.classList.add('modal-container')
  wrapper.classList.add('dropmenu-wrapper')
  menuItem_1.classList.add('dropmenu-menu-item')
  menuItem_2.classList.add('dropmenu-menu-item')

  nav.prepend(container)
  wrapper.innerHTML = `
  <div class="dropmenu-title">
    ${state.users.loginedUser ? state.users.loginedUser.cardNumber : 'Profile'}
  </div>
  `
  container.append(wrapper)
  wrapper.append(menuItem_1)
  wrapper.append(menuItem_2)

  wrapper.style.height = `115px`
  wrapper.style.left = `${right - 80}px`
  wrapper.style.top = `${bottom}px`

  if (state.users.loginedUser) {
    menuItem_1.dataset.role = 'myProfile'
    menuItem_1.innerText = 'My profile'
    menuItem_2.dataset.role = 'LogOut'
    menuItem_2.innerText = 'Log Out'
  } else {
    menuItem_1.dataset.role = 'logIn'
    menuItem_1.innerText = 'Log In'
    menuItem_2.dataset.role = 'Register'
    menuItem_2.innerText = 'Register'
  }

  return container
}
