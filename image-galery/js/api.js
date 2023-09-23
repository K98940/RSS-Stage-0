// https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo
const BASE_URL_UNSPLASH = 'https://api.unsplash.com/search/photos?query='
const UNSPLASH_KEY = '&client_id=1gKAQjrMkle4Nt4xbUNc3qN2DXQOuco-ahVw37LuICk'
const RESPONSE_ERR_MSGS = {
  400: `Bad Request. The request was unacceptable, often due to missing a required parameter.\n
  Запрос был неприемлем, часто из- за отсутствия требуемого параметра`,
  401: `Unauthorized. Invalid Access Token.\n
  Недопустимый токен доступа`,
  403: `Forbidden. Missing permissions to perform request.\n
  Отсутствуют разрешения для выполнения запроса`,
  404: `Not Found. The requested resource doesn’t exist.\n
  Запрошенный ресурс не существует`,
  500: `Server error. Something went wrong on our end.\n
  Что-то пошло не так с нашей стороны`,
  503: `Server error. Something went wrong on our end.\n
  Что-то пошло не так с нашей стороны`,
}

export const getData = async (query) => {
  let ratelimitRemaining = 0
  const url = `${BASE_URL_UNSPLASH}${query}${UNSPLASH_KEY}`
  const response = await fetch(url)
  console.log(`response =`, response)

  for (var header of response.headers.entries()) {
    if (header[0] === 'x-ratelimit-remaining') {
      ratelimitRemaining = parseInt(header[1])
    }
  }

  const data = await response.json()
  console.log(`data =`, data)

  return {
    ratelimitRemaining: ratelimitRemaining,
    status: response.status,
    statusText: RESPONSE_ERR_MSGS[response.status],
    data: data
  }
}