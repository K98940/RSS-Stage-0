import * as profile from './profile.js'
import * as state from './state.js'

const deleteOldInstance = () => {
  const el = document.querySelector('.info-panel')
  el && el.remove()
}

export const createInfoDiv = (account) => {
  const div = document.createElement('div')
  const visits = document.createElement('div')
  const bonuses = document.createElement('div')
  const books = document.createElement('div')
  const name = document.querySelector('[name="name"]')
  const number = document.querySelector('[name="number"]')

  deleteOldInstance()

  div.className = 'info-panel'
  visits.className = 'info-column'
  bonuses.className = 'info-column'
  books.className = 'info-column'

  visits.innerHTML = `
  <div class="info-column-title">visits</div>
  <div class="info-column-icon"><img src="./assets/icon/visits.svg" alt="visits"></div>
  <div class="info-column-data">${account?.visits || '0'}</div>`

  bonuses.innerHTML = `
  <div class="info-column-title">bonuses</div>
  <div class="info-column-icon"><img src="./assets/icon/bonuses.svg" alt="bonuses"></div>
  <div class="info-column-data">${account?.bonuses || '0'}</div>`

  books.innerHTML = `
  <div class="info-column-title">Books</div>
  <div class="info-column-icon"><img src="./assets/icon/books.svg" alt="books"></div>
  <div class="info-column-data">${account?.books?.lenght || '0'}</div>`

  if (state.users.loginedUser) {
    name.value = state.users.loginedUser.firstName
    number.value = state.users.loginedUser.cardNumber
  }

  div.append(visits, bonuses, books)

  setTimeout(() => { div.classList.add('info-panel-icons__fullsize') }, 0)
  return div
}