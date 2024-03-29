import { state } from './state.js'

const URL = 'https://шумелка.рф/random-game/score.php'

export const getResults = async () => {
  try {
    const response = await fetch(URL, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
      body: `nickname=${state.nickname}&score=0`,
    })

    if (!response.ok) {
      return {
        data: null,
        error: response.status,
      }
    }

    const res = await response.json()
    if (res.error) {
      return {
        data: null,
        error: res.error,
      }
    }

    return {
      data: res.data,
      error: '',
    }

  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
}

export const saveResult = async () => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `nickname=${state.nickname}&score=${state.score}`,
    })

    if (!response.ok) {
      return {
        error: response.status,
      }
    }

    return {
      error: null,
    }

  } catch (error) {
    return {
      error: error,
    }

  }
}