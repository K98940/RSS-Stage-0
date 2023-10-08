import { state, game } from "./state.js"
import * as renders from './renders.js'
import * as api from './api.js'
import { showMessage } from './message.js'



export const handleState = {
  get: (target, key) => {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handleState)
    }

    return target[key]
  },
  set: (target, prop, value) => {
    target[prop] = value
    switch (prop) {
      case 'gameLevel':
        document.body.style.setProperty('--level', state.gameLevel)

        const label = document.getElementById('range-level-label')
        const inputScore = document.getElementById('input-score')
        const levelTitles = ['игра', 'тест']
        const levelScore = [2048, 16]
        state.maxScore = levelScore[value - 4]
        label.innerText = levelTitles[value - 4]
        inputScore.max = state.maxScore

        const line = Array(4)
        const matrix = line.fill(0).reduce(arr => {

          arr.push(Array(4).fill(0))
          return arr
        }, [])
        game.desk = matrix
        game.desk[0][0] = 2
        // game.desk[0][1] = 1024
        // game.desk[0][2] = 8
        // game.desk[0][3] = 16
        // game.desk[1][0] = 32
        // game.desk[1][1] = 64
        // game.desk[1][2] = 128
        // game.desk[1][3] = 256
        // game.desk[2][0] = 512
        // game.desk[2][1] = 1024
        renders.renderDesk()
        state.score = 0
        saveLocalStorage()
        break;

      case 'score':
        const scoreLabel = document.querySelector('.score>label')
        const scoreRange = document.getElementById('input-score')
        const scoreMax = document.getElementById('score-max')
        scoreLabel.innerText = value
        scoreRange.value = value
        if (state.maxScore < 2048) {
          scoreMax.classList.add('test_score')
        } else {
          scoreMax.classList.remove('test_score')
        }
        break

      case 'nickname':
        renderScoreBoard()
        saveLocalStorage()
        break

      case 'hint':
        saveLocalStorage()
        renders.renderDesk()
        break

      default:
        break;
    }
    return true
  },
}

export const renderScoreBoard = async () => {
  const scores = await api.getResults()
  if (scores.error) {
    showMessage(`Server error: ${scores.error}`)
    return
  }


  const lastResult = scores.data.map(r => r.id).sort((a, b) => b - a)[0]

  const records = document.getElementById('records')
  const htmlHeader = `
    <table>
    <thead class="thead bg-white-blur">
      <th width="80%" class="__align_left nickname">
        <button id="btn-change-name"></button>
        ${state.nickname}
      </th>
      <th width="20%" class="__align_right">Score</th>
    </thead>
    <tbody>
  `
  const htmlFooter = `
      </tbody>
  </table>
  `

  const htmlTable = scores.data.reduce((html, row, i) => {
    const isMyNick = row.nickname === state.nickname
    const style = isMyNick ? 'class="score-myscore"' : ''
    const attribLastResult = lastResult === row.id ? ' data-lastresult="yes"' : ''

    return `${html}
    <tr title="${row.date}" ${style} ${attribLastResult}>
      <td class="__align_left">${i + 1}. ${row.nickname} (${row.city})</td>
      <td class="__align_right">${row.score}</td>
    </tr>

    `
  }, '')

  records.innerHTML = htmlHeader + htmlTable + htmlFooter
  const btnChangeName = document.getElementById('btn-change-name')
  btnChangeName.addEventListener('click', () => {
    showMessage('Вы можете изменить своё имя. Выбирайте имя мудро!', true)
  })

  const scrollToMyResult = records.querySelector('[data-lastresult]')
  scrollToMyResult.scrollIntoView(true, {
    behavior: 'smooth',
  })
}

export const saveLocalStorage = () => {
  const ls = JSON.stringify(state)
  localStorage.setItem('RSS-random-game-202310012127', ls)
}

export const loadLocalStorage = () => {
  let ls = localStorage.getItem('RSS-random-game-202310012127')
  if (ls) {
    try {
      const rangeLevel = document.getElementById('range-level')
      ls = JSON.parse(ls)
      state.nickname = ls.nickname
      state.gameLevel = ls.gameLevel
      rangeLevel.value = state.gameLevel
      state.hint = ls.hint
      const hint = document.getElementById('hint')
      hint.checked = state.hint
      return true
    } catch (error) {
      console.log('error loadLocalStorage :>> ', error);
    }
    return false
  }
}
