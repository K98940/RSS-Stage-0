import * as profile from './profile.js'

const deleteOldInstance = () => {
  const el = document.querySelector('.info-panel')
  el && el.remove()
}

export const createInfoDiv = (account) => {
  const div = document.createElement('div')
  const visits = document.createElement('div')
  const bonuses = document.createElement('div')
  const books = document.createElement('div')

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
  <div class="info-column-data">${account?.books || '0'}</div>`

  div.append(visits, bonuses, books)

  setTimeout(() => { div.classList.add('info-panel-icons__fullsize') }, 0)
  return div
}