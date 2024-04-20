const inputField = document.getElementById('user-input')
const checkButton = document.getElementById('check-btn')
const clearButton = document.getElementById('clear-btn')
const resultsDiv = document.getElementById('results-div')

function telephoneCheck(str) {
  const countryCode = '1'
  const optionalCountryCode = `(${countryCode}\\s?)?`
  const areaCodeWithParentheses = '\\(\\d{3}\\)'
  const areaCodeWithoutParentheses = '\\d{3}'
  const areaCode = `(${areaCodeWithParentheses}|${areaCodeWithoutParentheses})`
  const separator = '[\\s-]?'
  const middleDigits = '\\d{3}'
  const lastDigits = '\\d{4}'

  const telephonePattern = new RegExp(
    `^${optionalCountryCode}${areaCode}${separator}${middleDigits}${separator}${lastDigits}$`
  )

  return telephonePattern.test(str)
}

function clickHandler() {
  const inputText = inputField.value

  if (inputText === '') {
    alert('Please provide a phone number')
  } else {
    const isValidNumber = telephoneCheck(inputText)
    if (isValidNumber) {
      resultsDiv.textContent = 'Valid US number: ' + inputText
    } else {
      resultsDiv.textContent = 'Invalid US number: ' + inputText
    }
  }
}

checkButton.addEventListener('click', clickHandler)

clearButton.addEventListener('click', () => {
  inputField.value = ''
  resultsDiv.textContent = ''
})
