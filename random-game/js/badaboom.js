import { state } from "./state.js"

export const boom = (element) => {
  const boom = document.getElementById('boom')
  const coord = element.getBoundingClientRect()
  console.log('coord :>> ', coord);

  const boomBox = document.createElement('div')
  boomBox.className = 'boom-box'
  boomBox.style.left = `${coord.left}px`
  boomBox.style.top = `${coord.top}px`

  for (let i = 0; i < 51; i++) {
    const spark = document.createElement('div')
    spark.className = 'spark'
    boomBox.append(spark)
    spark.style.left = `${coord.left}px`
    spark.style.top = `${coord.top}px`
    spark.style.backgroundColor = `hsl(${getRandom(300)}, 100%, 50%)`
  }

  boom.append(boomBox)

  const sparks = boomBox.querySelectorAll('.spark')
  setTimeout(() => {
    sparks.forEach(spark => {
      spark.style.left = `${coord.left + getRandom(200)}px`
      spark.style.top = `${coord.top + getRandom(200)}px`
      spark.classList.add('spark-blow')
      setTimeout(() => {
        boomBox.remove()
      }, state.animationDuration * 2)
    })
  }, 0)
}

const getRandom = (num) => {
  const isOdd = Math.floor(Math.random() * 10) % 2 === 0
  return isOdd ? Math.random() * num : Math.random() * num * -1
}