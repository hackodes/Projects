const inputField = document.getElementById('number')
const convertButton = document.getElementById('convert-btn')
const outputDiv = document.getElementById('output')

const romanNumerals = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

function convertToRoman(num) {
  let convertedNums = ''
  romanNumerals.forEach((numeral) => {
    let val = Math.floor(num / numeral[0])
    if (val > 0) {
      num = num - numeral[0] * Math.floor(num / numeral[0])
      while (val > 0) {
        convertedNums = convertedNums + numeral[1]
        val = val - 1
      }
    }
  })
  return convertedNums
}

function clickHandler() {
  const inputText = inputField.value

  if (inputText === '' || isNaN(inputText)) {
    outputDiv.textContent = 'Please enter a valid number'
  } else if (inputText == -1) {
    outputDiv.textContent = 'Please enter a number greater than or equal to 1'
  } else if (inputText >= 4000) {
    outputDiv.textContent = 'Please enter a number less than or equal to 3999'
  } else {
    const romanNumeral = convertToRoman(inputText)
    outputDiv.textContent = romanNumeral
  }
}

convertButton.addEventListener('click', clickHandler)
