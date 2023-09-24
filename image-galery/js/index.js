import { getData } from "./api.js"
import { showMessage } from "./modal.js"

const VENDORS_NAMES = ['unsplash', 'flickr']
const LSTORAGE_KEY = 'rss-galery-202309231525'

const headerTitle = document.querySelector('.header-title')
const headerLogo = document.getElementById('logo')
const sliderContainer = document.getElementById('slider-container')
const sliderClose = document.getElementById('slider-close')
const slides = document.getElementById('slides')
const cardContainer = document.getElementById('card-container')
const searchBtn = document.getElementById('search-btn')
const resetBtn = document.getElementById('reset-btn')
const searchInput = document.getElementById('search-input')
const countPhotos = document.getElementById('count-photos')
const light = document.querySelector('.end-line')
const ratelimit = document.getElementById('ratelimit')

const vendors = new Map(
  [
    [VENDORS_NAMES[0], {
      title: 'Unsplash API',
      logo: './assets/icon/unsplash.png',
    }],
    [VENDORS_NAMES[1], {
      title: 'Unsplash API',
    }],
  ]
)

const state = {
  currentVendor: VENDORS_NAMES[0],
  query: '',
  ratelimitRemaining: '',
  countPhotos: 10,
}

const renderRatelimit = () => {
  const limit = state.ratelimitRemaining
  ratelimit.innerText = state.ratelimitRemaining

  if (limit !== '') {
    if (limit < 11) {
      searchBtn.classList.add('__red-text-bg')
      searchBtn.classList.remove('__orange-text')
      searchBtn.classList.remove('__green-text')
      return
    }
    if (limit < 26) {
      searchBtn.classList.add('__orange-text')
      searchBtn.classList.remove('__red-text-bg')
      searchBtn.classList.remove('__green-text')
      return
    }
    searchBtn.classList.add('__green-text')
    searchBtn.classList.remove('__red-text-bg')
    searchBtn.classList.remove('__orange-text')
  }
}

const renderImages = (imgs) => {
  const bottomLightToggle = (imgs) => {
    if (imgs.length > 0) {
      light.classList.add('end-line__on')
    } else {
      light.classList.remove('end-line__on')
    }
  }

  const htmlImgs = imgs.map((img, i) => `
    <div class="card">
      <img src="${img.urls.thumb}" data-img="slides_${i}" alt="slides_${i}">
      <div class="description" data-img="slides_${i}" title="${img.alt_description}">${img.alt_description}</div>
      <div class="likes" data-id="${img.id}">
        <span data-id="${img.id}">${img.likes}</span>
        <img src="./assets/icon/heart.png" data-id="${img.id}" alt="like">
      </div>
    </div>
  `).join('')
  cardContainer.innerHTML = htmlImgs
  bottomLightToggle(imgs)
}

const fillSlider = (imgs) => {
  const htmlImgs = imgs.map((img, i, a) => `
    <div id="slides_${i}" class="slide">
      <img src="${img.urls.regular}" alt="${img.alt_description}">
      <a class="slide_prev" href="${i === 0 ? '#slides_' + (a.length - 1) : '#slides_' + (i - 1)}"></a>
      <a class="slide_next" href="${i === (a.length - 1) ? '#slides_0' : '#slides_' + (i + 1)}"></a>
    </div>
  `).join('')
  slides.innerHTML = htmlImgs
}

const saveLocalStorage = () => {
  localStorage.setItem(LSTORAGE_KEY, JSON.stringify(state))
}

const loadLocalStorage = () => {
  try {
    const ls_str = localStorage.getItem(LSTORAGE_KEY)
    const ls_obj = JSON.parse(ls_str)
    Object.assign(state, ls_obj)
  } catch (error) {
    showMessage(error)
  }
}

window.onload = async () => {
  loadLocalStorage()
  headerLogo.src = vendors.get(state.currentVendor).logo
  headerTitle.innerText = vendors.get(state.currentVendor).title
  searchInput.value = state.query
  countPhotos.value = state.countPhotos
  if (state.query) {
    handleRequest()
  } else {
    handleRequest()
  }
  renderRatelimit()
  showResetBtn()
  setClassCountPhotos()
}

const handleRequest = async () => {
  let uri = ''
  if (searchInput.value) {
    uri = `search/photos?query=${searchInput.value}&per_page=${state.countPhotos}`
  } else {
    uri = `photos/random?query=&count=${state.countPhotos}`
  }
  const data = await getData(uri)
  if (data.status === 200) {
    state.query = searchInput.value
    state.ratelimitRemaining = data.ratelimitRemaining
    const imgs = data.data.results ? data.data.results : data.data
    saveLocalStorage()
    renderImages(imgs)
    renderRatelimit()
    fillSlider(imgs)
  } else {
    showMessage(data.statusText)
  }
}

const handleCardContainer = (e) => {
  if (e.target.dataset.img) {
    sliderContainer.classList.toggle('slider-container__open')
    location = `#${e.target.dataset.img}`
  }
}

const showResetBtn = () => {
  setTimeout(() => {
    const isNonEmpty = searchInput.value.length
    if (isNonEmpty) {
      resetBtn.classList.add('reset-btn__show')
    } else {
      resetBtn.classList.remove('reset-btn__show')
    }
  }, 0)
}

const handleSearchInput = (e) => {
  if (e.code === 'Enter' || e.key === 'Enter') {
    handleRequest()
  }
  showResetBtn()
}

searchBtn.addEventListener('click', handleRequest)
searchInput.addEventListener('keydown', handleSearchInput)

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' || e.key === 'Escape') {
    sliderContainer.classList.remove('slider-container__open')
  }
})

sliderClose.addEventListener('click', () => {
  sliderContainer.classList.remove('slider-container__open')
})

const setClassCountPhotos = () => {
  const count = parseInt(countPhotos.value)
  state.countPhotos = count

  if (count > 29) {
    countPhotos.classList.add('__red-text')
  } else {
    countPhotos.classList.remove('__red-text')
  }
}

countPhotos.addEventListener('change', () => {
  const count = parseInt(countPhotos.value)
  state.countPhotos = count
  saveLocalStorage()
  setClassCountPhotos()
})

resetBtn.addEventListener('click', () => {
  searchInput.value = ''
  state.query = ''
  showResetBtn()
  saveLocalStorage()
})

cardContainer.addEventListener('click', handleCardContainer)