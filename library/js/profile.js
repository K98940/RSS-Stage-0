import * as state from './state.js'
import * as info from './info.js'
import * as libCards from './cards.js'
import * as favorites from './favorites.js'

export const setProfileIcon = () => {
  const titleElement = document.querySelector('.profile-title')
  if (state.users.loginedUser) {
    const { firstName, lastName } = state.users.loginedUser
    const initials = `${firstName[0] || ''}${lastName[0] || ''}`
    titleElement.innerText = initials
    titleElement.setAttribute('title', `${firstName || ''} ${lastName || ''}`)
    titleElement.classList.add('__visabil')
  } else {
    titleElement.innerText = ''
    titleElement.classList.remove('__visabil')
  }
}



export const setLoginedUser = (acc) => {
  acc.visits = acc.visits + 1
  state.users.loginedUser = acc

  const index = state.users.registered.filter(user => user.id === acc.id)
  state.users.registered[index] = acc

  localStorage.setItem('users', JSON.stringify(state.users))

  const bnt = document.querySelector('[data-role="checkCard"]')
  const divInfo = info.createInfoDiv(acc)
  bnt.append(divInfo)
  libCards.renderCardContent('.get-card-wrapper')
  favorites.FillCards('winter')
}



export const checkLogin = (query) => {
  const keysQuery = Object.keys(query)
  const filter = state.users.registered.filter(user => {
    const countMatches = keysQuery.reduce((match, key) => user[key] === query[key] ? match + 1 : match, 0)
    return countMatches === keysQuery.length
  }
  )

  return filter[0]
}



export const makeAccount = (inputs) => {

  const generationCardNumber = () => {
    return [...'123456789'].reduce((res, c) => {
      return res + (Math.floor(Math.random() * 16).toString(16).toUpperCase())
    }, '')
  }

  return {
    'id': state.users.registered.length + 1,
    'firstName': inputs[0].value,
    'lastName': inputs[1].value,
    'email': inputs[2].value,
    'password': inputs[3].value,
    'cardNumber': generationCardNumber(),
    'books': [],
    'visits': 0,
    'bonuses': 0,
    'hasLibraryCard': false,
  }
}



export const addRegisteredUser = (acc) => {

  const addNewRegistration = (a) => {
    state.users.registered.push(acc)
    localStorage.setItem('users', JSON.stringify(state.users))
  }

  let error = ''

  if (state.users.registered.length === 0) {
    addNewRegistration(acc)
    return true
  }

  state.users.registered.forEach(user => {
    if (user.email === acc.email) {
      error = ` пользователь с таким e-mail (${acc.email}) уже зарегистрирован, придумайте новый, извините :)`
    }
  })
  if (error) {
    alert(error)
    return false
  }

  addNewRegistration(acc)
  return true
}
