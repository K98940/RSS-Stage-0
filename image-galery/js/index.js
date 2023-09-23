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
const searchInput = document.getElementById('search-input')
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
}

const renderRatelimit = () => {
  const limit = state.ratelimitRemaining
  ratelimit.innerText = state.ratelimitRemaining

  if (limit !== '') {
    if (limit < 11) {
      ratelimit.classList.add('__red-text')
      return
    }
    if (limit < 26) {
      ratelimit.classList.add('__orange-text')
      return
    }
    ratelimit.classList.add('__green-text')
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
      <img src="${img.urls.thumb}" alt="slides_${i}">
      <div class="description" title="${img.alt_description}">${img.alt_description}</div>
      <div class="likes">
        <span>${img.likes}</span>
        <img src="./assets/icon/heart.png" alt="like">
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
  if (state.query) {
    handleSearch()
  }
  renderRatelimit()
}

const handleSearch = async () => {
  state.query = searchInput.value
  const data = await getData(state.query)
  if (data.status === 200) {
    state.ratelimitRemaining = data.ratelimitRemaining
    saveLocalStorage()
    renderImages(data.data.results)
    renderRatelimit()
    fillSlider(data.data.results)
  } else {
    showMessage(data.statusText)
  }
}

const handleCardContainer = (e) => {
  if (e.target.tagName === 'IMG') {
    sliderContainer.classList.toggle('slider-container__open')
    location = `#${e.target.alt}`
  }
}

searchBtn.addEventListener('click', handleSearch)
searchInput.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.key === 'Enter') {
    handleSearch()
  }
})

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' || e.key === 'Escape') {
    sliderContainer.classList.remove('slider-container__open')
  }
})

sliderClose.addEventListener('click', () => {
  sliderContainer.classList.remove('slider-container__open')
})



cardContainer.addEventListener('click', handleCardContainer)