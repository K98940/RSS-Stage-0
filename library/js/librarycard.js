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

  const ruleCardNumber = () => {
    cardNumber.value = cardNumber.value.match(/\d/g)?.join('') || ''
    return cardNumber.value.length === 16 ? null : { input: cardNumber, error: '' }
  }

  const ruleExpirationCode_1 = () => {
    expirationCode.value = expirationCode.value.match(/\d/g)?.join('') || ''
    return expirationCode.value.length === 2 ? null : { input: expirationCode, error: '' }
  }

  const ruleExpirationCode_2 = () => {
    expirationCode2.value = expirationCode2.value.match(/\d/g)?.join('') || ''
    return expirationCode2.value.length === 2 ? null : { input: expirationCode2, error: '' }
  }

  const ruleCVC = () => {
    CVC.value = CVC.value.match(/\d/g)?.join('') || ''
    return CVC.value.length === 3 ? null : { input: CVC, error: '' }
  }

  const rules = [
    ruleCardNumber,
    ruleExpirationCode_1,
    ruleExpirationCode_2,
    ruleCVC
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

    modal.showMessage('Оплата временно не работает, но мы принимаем наличку :)', 4, btnBuy)
    modal.removeExistModal()
  }

  const handleKey = (e) => {
    e.target.classList.remove('buydialog__error')
  }

  const elementsForm = [
    createElement({ tag: 'label', text: 'Bank card number', for: 'cardNumber' }),
    createElement({ tag: 'input', class: 'common-input', id: 'cardNumber', title: 'must contain 16 digits' }),
    createElement({ tag: 'label', text: 'Expiration code', for: 'expirationCode' }),
    createElement({ tag: 'input', id: 'expirationCode', class: 'common-input buydialog-expirationCode', title: 'must contain 2 digits' }),
    createElement({ tag: 'input', id: 'expirationCode2', class: 'common-input buydialog-expirationCode', title: 'must contain 2 digits' }),
    createElement({ tag: 'label', text: 'CVC', for: 'CVC' }),
    createElement({ tag: 'input', id: 'CVC', class: 'common-input buydialog-expirationCode __extra-margin', title: 'must contain 3 digits' }),
    createElement({ tag: 'label', text: 'Cardholder name', for: 'cardholder' }),
    createElement({ tag: 'input', id: 'cardholder', class: 'common-input' }),
    createElement({ tag: 'label', text: 'Postal code', for: 'postalCode' }),
    createElement({ tag: 'input', id: 'postalCode', class: 'common-input' }),
    createElement({ tag: 'label', text: 'City / Town', for: 'city' }),
    createElement({ tag: 'input', id: 'city', class: 'common-input __extra-margin' }),
  ]

  const wrapper = createElement({ tag: 'div', class: 'buydialog-wrapper', })
  const header = createElement({ tag: 'h2', class: 'buydialog-header', text: 'Buy a library card' })
  const main = createElement({ tag: 'div', class: 'buydialog-main' })
  const leftSide = createElement({ tag: 'div', class: 'buydialog-leftside' })
  const rightSide = createElement({ tag: 'div', class: 'buydialog-rightside', text: 'If you are live, work, attend school, or pay property taxes in New York State, you can get a $25 digital library card right now using this online form. Visitors to New York State can also use this form to apply for a temporary card.' })
  const form = createElement({ tag: 'form' })
  const footer = createElement({ tag: 'div', class: 'buydialog-btn-wrapper' })
  const btnBuy = createElement({ tag: 'button', text: 'Buy', class: 'buydialog-btn-buy' })
  const spanPrice = createElement({ tag: 'span', text: '$ 25.00', class: 'buydialog-span-price' })


  wrapper.append(header)
  wrapper.append(main)
  main.append(leftSide)
  main.append(rightSide)
  leftSide.append(form)
  elementsForm.forEach(el => form.append(el))
  form.append(footer)
  footer.append(btnBuy)
  footer.append(spanPrice)

  btnBuy.addEventListener('click', handleClick)
  wrapper.addEventListener('keypress', handleKey)

  return wrapper
}