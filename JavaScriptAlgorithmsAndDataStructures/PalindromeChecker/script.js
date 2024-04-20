const inputField = document.getElementById('text-input')
const checkButton = document.getElementById('check-btn')
const resultDiv = document.getElementById('result')

function palindrome(str) {
  let word = str.replace(/[^A-Za-z0-9]/g, '')
  const wordUppercase = word.toUpperCase()
  for (let i = 0; i < word.length; i++) {
    if (wordUppercase[i] != wordUppercase[word.length - 1 - i]) {
      return false
    }
  }
  return true
}

function clickHandler() {
  const inputText = inputField.value

  if (inputText === '') {
    alert('Please input a value')
  } else {
    const isPalindrome = palindrome(inputText)

    if (isPalindrome) {
      resultDiv.textContent = inputText + ' is a palindrome'
    } else {
      resultDiv.textContent = inputText + ' is not a palindrome'
    }
  }
}

checkButton.addEventListener('click', clickHandler)
