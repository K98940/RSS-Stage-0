import * as modal from './modal.js'
import * as login from './login.js'
import * as state from './state.js'

export const FillCards = (season) => {

  const handleBookButton = (e) => {
    const bookID = e.target.dataset.bookid
    console.log('bookID', bookID)

    if (!state.users.loginedUser) {
      modal.createModalContainer(login.createLoginDialog)
    }
  }

  const container = document.querySelector('.favorites-items-wrapper')
  container.style.opacity = '0'

  setTimeout(() => {
    container.innerHTML = ''
    state.seasons[season].forEach(book => {
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
      if (book.ownership) {
        button.classList.add('favorites-item-button__own')
      }
      button.innerText = book.ownership ? 'Own' : 'Buy'
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