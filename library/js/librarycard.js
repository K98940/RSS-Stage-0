import * as state from './state.js'
import * as modal from './modal.js'

export const createBuyDialog = () => {

  const createElement = (el) => {
    const element = document.createElement(el.tag)
    element.className = el.class || ''
    element.innerText = el.text || ''
    if (!el.text) element.innerHTML = el.html || ''
    if (el.for) element.setAttribute('for', el.for)
    if (el.id) element.setAttribute('id', el.id)
    if (el.pattern) element.setAttribute('pattern', el.pattern)
    if (el.title) element.setAttribute('title', el.title)
    return element
  }

  const isCorrectCardNumber = () => {
    const filter = cardNumberInput.value.match(/\d/g)?.join('') || ''
    cardNumberInput.value = filter
    return filter.length === 16 ? null : { input: cardNumberInput, error: '' }
  }

  const isCorrectExpirationCode_1 = () => {
    const filter = expirationCodeInput_1.value.match(/\d/g)?.join('') || ''
    expirationCodeInput_1.value = filter
    return filter.length === 2 ? null : { input: expirationCodeInput_1, error: '' }
  }

  const isCorrectExpirationCode_2 = () => {
    const filter = expirationCodeInput_2.value.match(/\d/g)?.join('') || ''
    expirationCodeInput_2.value = filter
    return filter.length === 2 ? null : { input: expirationCodeInput_2, error: '' }
  }

  const isCorrectCVC = () => {
    const filter = CVCInput.value.match(/\d/g)?.join('') || ''
    CVCInput.value = filter
    return filter.length === 3 ? null : { input: CVCInput, error: '' }
  }

  const rules = [
    isCorrectCardNumber,
    isCorrectExpirationCode_1,
    isCorrectExpirationCode_2,
    isCorrectCVC
  ]
  const handleClick = (e) => {
    e.preventDefault()
    const errors = rules.map(rule => rule()).filter(e => e)
    errors.forEach(error => error?.input?.classList.add('buydialog__error'))
    if (errors[0]) {
      modal.showMessage('Пожалуйста заполните все поля правильно', 2, errors[0].input, true)
      return
    }

    state.users.loginedUser.hasLibraryCard = true
    const index = state.users.registered.findIndex(user => user.id === state.users.loginedUser.id)
    state.users.registered[index] = state.users.loginedUser
    localStorage.setItem('users', JSON.stringify(state.users))

    modal.showMessage('Оплата временно не работает, но мы принимаем наличку :)', 3, this)
    wrapper && wrapper.remove()
  }

  const handleKey = (e) => {
    e.target.classList.remove('buydialog__error')
  }

  const wrapper = createElement({ tag: 'div', class: 'buydialog-wrapper', })
  const header = createElement({ tag: 'h2', class: 'buydialog-header', text: 'Buy a library card' })
  const main = createElement({ tag: 'div', class: 'buydialog-main' })
  const leftSide = createElement({ tag: 'div', class: 'buydialog-leftside' })
  const rightSide = createElement({ tag: 'div', class: 'buydialog-rightside', text: 'If you are live, work, attend school, or pay property taxes in New York State, you can get a $25 digital library card right now using this online form. Visitors to New York State can also use this form to apply for a temporary card.' })

  const form = createElement({ tag: 'form' })
  const cardNumberLabel = createElement({ tag: 'label', text: 'Bank card number', for: 'cardNumber' })
  const cardNumberInput = createElement({ tag: 'input', class: 'common-input', id: 'cardNumber', title: 'must contain 16 digits' })

  const expirationCodeLabel = createElement({ tag: 'label', text: 'Expiration code', for: 'expirationCode' })
  const expirationCodeInput_1 = createElement({ tag: 'input', id: 'expirationCode', class: 'common-input buydialog-expirationCode', title: 'must contain 2 digits' })
  const expirationCodeInput_2 = createElement({ tag: 'input', id: 'expirationCode2', class: 'common-input buydialog-expirationCode', title: 'must contain 2 digits' })

  const CVCLabel = createElement({ tag: 'label', text: 'CVC', for: 'CVC' })
  const CVCInput = createElement({ tag: 'input', id: 'CVC', class: 'common-input buydialog-expirationCode __extra-margin', title: 'must contain 3 digits' })

  const cardholderNameLabel = createElement({ tag: 'label', text: 'Cardholder name', for: 'cardholder' })
  const cardholderNameInput = createElement({ tag: 'input', id: 'cardholder', class: 'common-input' })

  const postalCodeLabel = createElement({ tag: 'label', text: 'Postal code', for: 'postalCode' })
  const postalCodeInput = createElement({ tag: 'input', id: 'postalCode', class: 'common-input' })

  const cityLabel = createElement({ tag: 'label', text: 'City / Town', for: 'city' })
  const cityInput = createElement({ tag: 'input', id: 'city', class: 'common-input __extra-margin' })

  const footer = createElement({ tag: 'div', class: 'buydialog-btn-wrapper' })
  const btnBuy = createElement({ tag: 'button', text: 'Buy', class: 'buydialog-btn-buy' })
  const spanPrice = createElement({ tag: 'span', text: '$ 25.00', class: 'buydialog-span-price' })

  wrapper.append(header)
  wrapper.append(main)
  main.append(leftSide)
  main.append(rightSide)

  leftSide.append(form)
  form.append(cardNumberLabel)
  form.append(cardNumberInput)

  form.append(expirationCodeLabel)
  form.append(expirationCodeInput_1)
  form.append(expirationCodeInput_2)

  form.append(CVCLabel)
  form.append(CVCInput)

  form.append(cardholderNameLabel)
  form.append(cardholderNameInput)

  form.append(postalCodeLabel)
  form.append(postalCodeInput)

  form.append(cityLabel)
  form.append(cityInput)

  form.append(footer)
  footer.append(btnBuy)
  footer.append(spanPrice)

  btnBuy.addEventListener('click', handleClick)
  wrapper.addEventListener('keypress', handleKey)

  return wrapper
}