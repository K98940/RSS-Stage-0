import { state } from "./state.js"
import { handleRangeLevel } from "./rangeLevel.js"

const rangeLevel = document.getElementById('range-level')
rangeLevel.addEventListener('input', handleRangeLevel)

const init = () => {

}