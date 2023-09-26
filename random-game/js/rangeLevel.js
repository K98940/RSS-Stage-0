const label = document.getElementById('range-level-label')

export const handleRangeLevel = (e) => {
  label.innerText = e.target.value
}