import * as state from './state.js'

const deleteOldInstance = () => {
  if (state.users.loginedUser) return
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
  <div class="info-column-data">${account?.books?.length || '0'}</div>`

  if (state.users.loginedUser) {
    name.value = state.users.loginedUser.firstName
    name.setAttribute('disabled', '')
    number.value = state.users.loginedUser.cardNumber
    number.setAttribute('disabled', '')
  }

  div.append(visits, bonuses, books)

  setTimeout(() => { div.classList.add('info-panel-icons__fullsize') }, 0)
  return div
}

export const createRentedDiv = (account) => {
  const div = document.createElement('div')
  const listOfRentedBook = getListOfRentedBook(account)

  div.className = 'rented-wrapper'

  div.innerHTML = `
  <div class="rented-title">Rented books</div>
  `
  div.append(listOfRentedBook)

  return div
}

const getListOfRentedBook = (account) => {
  const div = document.createElement('div')
  const rentedBooks = account.books?.map(id => [...state.catalogBooks.filter(book => book.id === id)]).
    map(book => `<li>${book[0]?.title}, ${book[0]?.author.replace('By ', '')}</li>`).join('').toLowerCase()

  div.className = 'list-rented-books'
  div.innerHTML = `<ul>${rentedBooks || ''}</li>`

  return div
}