import * as modal from './modal.js'
import * as login from './login.js'
import * as state from './state.js'
import * as libCards from './cards.js'
import * as librarycard from './librarycard.js'
import * as info from './info.js'

export const FillCards = (season) => {

  const handleBookButton = (e) => {
    const bookID = e.target.dataset.bookid

    if (!state.users.loginedUser) {
      modal.createModalContainer(login.createLoginDialog)
      return
    }

    if (!state.users.loginedUser.hasLibraryCard) {
      modal.createModalContainer(librarycard.createBuyDialog)
      return
    }

    if (!state.users.loginedUser.books) state.users.loginedUser.books = []
    if (state.users.loginedUser.books?.includes(+bookID)) return
    state.users.loginedUser.books.push(+bookID)
    const index = state.users.registered.findIndex(user => user.id === state.users.loginedUser.id)
    state.users.registered[index] = state.users.loginedUser
    localStorage.setItem('users', JSON.stringify(state.users))

    e.target.classList.add('favorites-item-button__own')
    e.target.innerText = 'Own'

    const bnt = document.querySelector('[data-role="checkCard"]')
    const divInfo = info.createInfoDiv(state.users.loginedUser)
    bnt.append(divInfo)

  }

  const container = document.querySelector('.favorites-items-wrapper')
  const filteredBooks = state.catalogBooks.filter(book => book.season === season)
  container.style.opacity = '0'

  setTimeout(() => {
    container.innerHTML = ''
    filteredBooks.forEach(book => {
      const isRented = state.users.loginedUser?.books?.filter(own => own === book.id).length > 0
      const favoritesItem = document.createElement('div')
      favoritesItem.classList.add('favorites-item')
      container.append(favoritesItem)

      const ItemTitle = document.createElement('div')
      ItemTitle.classList.add('favorites-item-title')
      ItemTitle.innerText = 'Staff Picks'
      favoritesItem.append(ItemTitle)

      const bookName = document.createElement('div')
      bookName.classList.add('favorites-item-subtitle', 'favorites-item-book-name')
      bookName.innerText = book.title
      favoritesItem.append(bookName)

      const bookAuthor = document.createElement('div')
      bookAuthor.classList.add('favorites-item-subtitle', 'favorites-item-book-author')
      bookAuthor.innerText = book.author
      favoritesItem.append(bookAuthor)

      const posterWrapper = document.createElement('div')
      posterWrapper.classList.add('favorites-description-poster-wrapper')
      favoritesItem.append(posterWrapper)

      const description = document.createElement('div')
      description.classList.add('favorites-item-description')
      description.innerHTML = `<p>${book.description}</p>`
      posterWrapper.append(description)

      const button = document.createElement('button')
      button.setAttribute('tabindex', '-1')
      button.dataset.bookid = book.id
      button.classList.add('favorites-item-button')
      if (isRented) {
        button.classList.add('favorites-item-button__own')
      }
      button.innerText = isRented ? 'Own' : 'Buy'
      button.addEventListener('click', handleBookButton)
      description.append(button)

      const poster = document.createElement('div')
      poster.classList.add('favoritesitem-poster')
      poster.innerHTML = `<img src="${book.poster}" alt="poster ${book.title}">`
      favoritesItem.append(poster)
    })
    container.style.opacity = '1'
  }, 300)
}

export const ChangeCards = (season) => {
  FillCards(season)
}