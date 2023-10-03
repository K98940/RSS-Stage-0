import { state } from "./state.js"

export const boom = (element) => {
  let countSparks = 0
  let countSuperSpark = 0
  let sqrt = 0
  let timeQ = 2

  try {
    sqrt = parseInt(element.querySelector('.cell-core').innerText)
    sqrt = Math.sqrt(sqrt)
    countSparks = Math.floor(sqrt * 2)
    countSuperSpark = Math.floor(sqrt)
    timeQ += sqrt / 2
  } catch (error) {
    countSparks = 1
    countSuperSpark = 1
    sqrt = 1
  }

  const boom = document.getElementById('boom')
  const coord = element.getBoundingClientRect()

  const boomBox = document.createElement('div')
  boomBox.className = 'boom-box'
  boomBox.style.left = `${coord.left}px`
  boomBox.style.top = `${coord.top}px`

  for (let i = 0; i < countSparks; i++) {
    const spark = document.createElement('div')
    spark.className = 'spark'
    boomBox.append(spark)
    spark.style.left = `${coord.left}px`
    spark.style.top = `${coord.top}px`
    spark.style.backgroundColor = `hsl(${getRandomNegative(300)}, 100%, 50%)`
    spark.style.transitionDuration = `${state.animationDuration * timeQ}ms`
  }

  for (let i = 0; i < countSuperSpark; i++) {
    const superSpark = document.createElement('div')
    superSpark.className = 'spark super-spark'
    boomBox.append(superSpark)
    superSpark.style.left = `${coord.left}px`
    superSpark.style.top = `${coord.top}px`
    superSpark.style.transitionTimingFunction = `cubic-bezier(${getRandomPositive(0.3)}, ${getRandomPositive(0.5)}, ${getRandomPositive(0.7)}, ${getRandomPositive(1)})`
    superSpark.style.transitionDuration = `${state.animationDuration * timeQ}ms`
  }

  boom.append(boomBox)

  const sparks = boomBox.querySelectorAll('.spark')
  setTimeout(() => {
    sparks.forEach(spark => {
      spark.style.left = `${coord.left + getRandomNegative(300)}px`
      spark.style.top = `${coord.top + getRandomNegative(300)}px`
      spark.classList.add('spark-blow')
      setTimeout(() => {
        boomBox.remove()
      }, state.animationDuration * timeQ)
    })
  }, 0)
}

const getRandomNegative = (num) => {
  const isOdd = Math.floor(Math.random() * 10) % 2 === 0
  return isOdd ? Math.random() * num : Math.random() * num * -1
}

const getRandomPositive = (num) => {
  return Math.random() * num
}