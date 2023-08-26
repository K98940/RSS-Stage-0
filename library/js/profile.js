import * as state from './state.js'

export const setProfileIcon = () => {
  const { firstName, lastName } = state.users.loginedUser || {}
  if (state.users.loginedUser) {
    const title = `${firstName[0] || ''}${lastName[0] || ''}`
    document.querySelector('.profile-title').innerText = title
    document.querySelector('.profile-title').classList.add('__visabil')
  } else {
    document.querySelector('.profile-title').classList.remove('__visabil')
  }
}



export const setLoginedUser = (acc) => {
  state.users.loginedUser = {
    'firstName': acc.firstName,
    'lastName': acc.lastName,
    'email': acc.email,
    'password': acc.password,
    'cardNumber': acc.cardNumber,
    'books': acc.books,
  }
  localStorage.setItem('users', JSON.stringify(state.users))
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
    'firstName': inputs[0].value,
    'lastName': inputs[1].value,
    'email': inputs[2].value,
    'password': inputs[3].value,
    'cardNumber': generationCardNumber(),
    'books': null,
    'visits': 1,
    'bonuses': 0,
    'books': 0,
  }
}



export const addRegisteredUser = (acc) => {

  const addNewRegistration = (a) => {
    state.users.registered.push({
      'firstName': a.firstName,
      'lastName': a.lastName,
      'email': a.email,
      'password': a.password,
      'cardNumber': a.cardNumber,
      'books': null,
      'visits': 1,
      'bonuses': 0,
      'books': 0,
    })
    localStorage.setItem('users', JSON.stringify(state.users))
  }

  let error = ''

  if (state.users.registered.length === 0) {
    addNewRegistration(acc)
    return true
  }

  state.users.registered.forEach(user => {
    if (user.email === acc.email) {
      error = `такой e-mail (${acc.email}) уже использовался, придумайте новый :)`
    }
  })
  if (error) {
    alert(error)
    return false
  }

  addNewRegistration(acc)
  return true
}
