import * as carousel from './carousel.js'

const burger = document.getElementById('burger-toggle')
const menuBtn = document.getElementById('menu-btn')
const nav = document.getElementsByTagName('nav')[0]
const body = document.getElementsByTagName('body')[0]
let isWindowResized = false

const removeMenu = (e) => {
  const toggleScrollBlock = () => {
    if (burger.checked) {
      body.classList.add('__block-scroll')
    } else {
      body.classList.remove('__block-scroll')
    }
  }

  if (e.target != burger && e.target != menuBtn && e.target != nav) {
    burger.checked = false
  }
  toggleScrollBlock()
}

const containerCarousel = document.querySelector('.container-carousel')
carousel.initCarousel(containerCarousel)

document.addEventListener('click', removeMenu)
document.addEventListener('keydown', removeMenu)
window.addEventListener('resize', () => {
  if (!isWindowResized) setTimeout(() => {
    carousel.initCarousel(containerCarousel)
    isWindowResized = false
  }, 500)
  isWindowResized = true
})
