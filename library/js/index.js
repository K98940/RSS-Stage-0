import * as carousel from './carousel.js'
import * as favorites from './favorites.js'
import * as state from './state.js'
import * as dropMenu from './drop_menu.js'
import * as register from './register.js'
import * as modal from './modal.js'
import * as profile from './profile.js'
import * as login from './login.js'
import * as info from './info.js'

const burger = document.getElementById('burger-toggle')
const profileBtn = document.querySelector('.profile')
const checkCard = document.querySelector('[data-role="checkCard"]')
const name = document.querySelector('[name="name"]')
const number = document.querySelector('[name="number"]')
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
      menu = dropMenu.createMenu(profileBtn)
      break;

    default:
      burger.checked = false
      state.app.modal = burger.checked
      menu && menu.remove()
      break;
  }

  switch (role) {
    case 'logIn':
      modal.createModalContainer(login.createLoginDialog)
      break;
    case 'Register':
      modal.createModalContainer(register.createRegisterDialog)
      break;
    case 'LogOut':
      state.users.loginedUser = null
      profile.setProfileIcon()
      localStorage.setItem('users', JSON.stringify(state.users))
      const divInfo = document.querySelector('.info-panel')
      divInfo.remove()
      name.value = ''
      number.value = ''
      break;

    default:
      break;
  }

  toggleScrollBlock()
}

const disableTabindex = () => {
  const Elements = []
  Elements.push(...document.querySelectorAll('input'))
  Elements.push(...document.querySelectorAll('a'))
  Elements.push(...document.querySelectorAll('button'))
  Elements.forEach(el => {
    el.setAttribute('tabindex', '-1')
  })
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
    if (state.users.loginedUser) {
      const bnt = document.querySelector('[data-role="checkCard"]')
      const divInfo = info.createInfoDiv(state.users.loginedUser)
      bnt.append(divInfo)
    }
  } catch (error) {
    console.warn('error get localStorage data: ', error)
  }
  disableTabindex()
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

const handleCheckCard = (e) => {
  e.preventDefault()
  if (state.users.loginedUser) return
  const account = profile.checkLogin({ firstName: name.value, cardNumber: number.value })
  if (account) {
    const bnt = document.querySelector('[data-role="checkCard"]')
    const divInfo = info.createInfoDiv(account)
    bnt.append(divInfo)
    setTimeout(() => {
      divInfo.classList.remove('info-panel-icons__fullsize')
      setTimeout(() => {
        name.value = ''
        number.value = ''
        divInfo.remove()
      }, 400)
    }, 10000)

  } else {
    alert('ничего не найдено :(')
  }
}
checkCard.addEventListener('click', handleCheckCard)