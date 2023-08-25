import * as carousel from './carousel.js'
import * as favorites from './favorites.js'
import * as state from './state.js'
import * as dropMenu from './drop_menu.js'
import * as register from './register.js'
import * as modal from './modal.js'
import * as profile from './profile.js'
import * as login from './login.js'

const burger = document.getElementById('burger-toggle')
const profileBtn = document.querySelector('.profile')
let isWindowResized = false
let menu = null


const toggleScrollBlock = () => {
  if (state.app.modal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}


const handleDocumentClick = (e) => {
  const { id } = e.target.closest('.profile') || e.target.closest('#burger-label') || {}
  const { role } = e.target.dataset || null

  switch (id) {
    case 'burger-label':
      burger.checked = !burger.checked
      state.app.modal = burger.checked
      menu && menu.remove()
      break;
    case "profile":
      burger.checked = false
      state.app.modal = true
      menu = dropMenu.createMenu(state.users.loginedUser, profileBtn)
      break;

    default:
      burger.checked = false
      state.app.modal = burger.checked
      menu && menu.remove()
      break;
  }

  switch (role) {
    case 'logIn':
      modal.createModalContainer()
      break;
    case 'Register':
      modal.createModalContainer(register.createRegisterDialog)
      break;
    case 'LogOut':
      state.users.loginedUser = null
      profile.setProfileIcon()
      localStorage.setItem('users', JSON.stringify(state.users))
      break;

    default:
      break;
  }

  toggleScrollBlock()
}


const initApp = () => {
  try {
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
      Object.assign(state.users, users)
      if (state.users.loginedUser) {
        profile.setProfileIcon()
      }
    }
  } catch (error) {
    console.warn('error get localStorage data', error)
  }
}


const containerCarousel = document.querySelector('.container-carousel')
carousel.initCarousel(containerCarousel)

document.addEventListener('DOMContentLoaded', initApp)
document.addEventListener('click', handleDocumentClick)
window.addEventListener('resize', () => {
  if (!isWindowResized) setTimeout(() => {
    carousel.initCarousel(containerCarousel)
    isWindowResized = false
  }, 500)
  isWindowResized = true
})

favorites.FillCards('winter')
const radios = document.querySelectorAll('label[data-season]')
radios.forEach(radio => radio.addEventListener('click', () => {
  radio.previousElementSibling.checked = true
  favorites.FillCards(radio.dataset.season)
}))
