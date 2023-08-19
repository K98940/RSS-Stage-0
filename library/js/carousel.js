
export const initCarousel = (container) => {

  const getSizeStep = (container) => {
    const cards = container.querySelectorAll('div[data-carousel-item]')
    maxItem = cards.length - 1
    const sizeStep = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left
    return sizeStep
  }

  const setActiveClass = (btnNum) => {
    const btns = container.querySelectorAll('div[data-carousel-btn]')
    btns.forEach(btn => {
      btn.classList.remove('pagination-btn__active')
    });
    console.log(`setActiveClass(${btnNum})`)
    container.querySelector(`[data-carousel-btn="${btnNum}"]`).classList.add('pagination-btn__active')
  }

  const btnHandle = (e) => {
    const btnNum = e.target.dataset.carouselBtn || e.target.parentElement.dataset.carouselBtn
    curItem = btnNum
    items.style.left = `${-(btnNum * sizeStep)}px`
    setActiveClass(btnNum)
  }

  const frameHandle = (e) => {
    console.log(`e.clientX: ${e.clientX}`)
    if (e.offsetY < 275 || e.offsetY > 325) return

    if (e.clientX > itemLeftEdge - 20 && e.clientX < itemLeftEdge + 40) {
      curItem = curItem > 0 ? curItem - 1 : curItem
      items.style.left = `${-(curItem * sizeStep)}px`
      setActiveClass(curItem)
      console.log(`pressed left arrow`)
    }
    if (e.clientX > itemRightEdge - 40 && e.clientX < itemRightEdge + 20) {
      curItem = curItem >= maxItem ? curItem : +curItem + 1
      items.style.left = `${-(curItem * sizeStep)}px`
      setActiveClass(curItem)
      console.log(`pressed right arrow`)
    }
    // console.log(`curItem: ${curItem}`)
    console.log(`leftEdge: ${itemLeftEdge}`)
  }

  const setHandlers = (container) => {
    const btns = container.querySelectorAll('div[data-carousel-btn]')
    btns.forEach(btn => {
      btn.addEventListener('click', btnHandle)
    });

    container.addEventListener('click', frameHandle, true)
  }

  let curItem = 0
  let maxItem = 0
  const itemLeftEdge = (window.screen.width - 610) / 2
  const itemRightEdge = (window.screen.width + 610) / 2
  const items = container.querySelector('.images-items')
  const sizeStep = getSizeStep(container)
  setActiveClass(0)
  items.style.left = `0`
  setHandlers(container)
}
