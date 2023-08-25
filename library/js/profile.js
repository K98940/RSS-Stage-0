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

export const setLoginedUser = (inputs) => {
  state.users.loginedUser = {
    'firstName': inputs[0].value,
    'lastName': inputs[1].value,
    'email': inputs[2].value,
    'password': inputs[3].value,
  }
  localStorage.setItem('users', JSON.stringify(state.users))
}

export const addRegisteredUser = (inputs) => {
  let error = ''
  if (state.users.registered.length === 0) {
    state.users.registered.push({
      'firstName': inputs[0].value,
      'lastName': inputs[1].value,
      'email': inputs[2].value,
      'password': inputs[3].value,
    })
    localStorage.setItem('users', JSON.stringify(state.users))
    return true
  }
  state.users.registered.forEach(user => {
    if (user.email === inputs[2].value) {
      error = `такой e-mail (${inputs[2].value}) уже использовался, придумайте новый :)`
    }
  })

  if (error) {
    alert(error)
    return false
  } else {
    state.users.registered.push({
      'firstName': inputs[0].value,
      'lastName': inputs[1].value,
      'email': inputs[2].value,
      'password': inputs[3].value,
    })
    localStorage.setItem('users', JSON.stringify(state.users))
    return true
  }
}