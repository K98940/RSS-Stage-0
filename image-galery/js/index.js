import { getData } from "./api.js"
import { showMessage } from "./modal.js"

const VENDORS_NAMES = ['unsplash', 'flickr']
const headerTitle = document.querySelector('.header-title')
const headerLogo = document.getElementById('logo')
const sliderContainer = document.getElementById('slider-container')
const sliderClose = document.getElementById('slider-close')
const slides = document.getElementById('slides')
const cardContainer = document.getElementById('card-container')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')

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
}

const renderImages = (imgs) => {
  const htmlImgs = imgs.map((img, i) => `
    <div class="card">
      <img src="${img.urls.thumb}" alt="slides_${i}">
      <div class="description">${img.alt_description}</div>
      <div class="likes">
        <span>${img.likes}</span>
        <img src="./assets/icon/heart.png" alt="like">
      </div>
    </div>
  `).join('')
  cardContainer.innerHTML = htmlImgs
}

const fillSlider = (imgs) => {
  const htmlImgs = imgs.map((img, i, a) => `
    <div id="slides_${i}" class="slide">
      <img src="${img.urls.thumb}" alt="${img.alt_description}">
      <a class="slide_prev" href="${i === 0 ? '#slides_' + (a.length - 1) : '#slides_' + (i - 1)}"></a>
      <a class="slide_next" href="${i === (a.length - 1) ? '#slides_0' : '#slides_' + (i + 1)}"></a>
    </div>
  `).join('')
  slides.innerHTML = htmlImgs
}


window.onload = async () => {
  headerLogo.src = vendors.get(state.currentVendor).logo
  headerTitle.innerText = vendors.get(state.currentVendor).title
}

const handleSearch = async () => {
  const data = await getData(searchInput.value)
  if (data.status === 200) {
    renderImages(data.data.results)
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