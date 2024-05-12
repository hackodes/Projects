const translateHandler = async () => {
  const textArea = document.getElementById('text-input')
  const localeArea = document.getElementById('locale-select')
  const errorArea = document.getElementById('error-msg')
  const translatedArea = document.getElementById('translated-sentence')
  const solutionContainer = document.getElementById('solution-container')

  solutionContainer.classList.remove('hidden')

  errorArea.innerText = ''
  translatedArea.innerText = ''

  const data = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text: textArea.value, locale: localeArea.value }),
  })

  const parsed = await data.json()
  if (parsed.error) {
    translatedArea.style.display = 'none'
    errorArea.innerText = JSON.stringify(parsed)
    return
  }

  errorArea.style.display = 'none'
  translatedArea.innerHTML = parsed.translation
  return
}

document.getElementById('translate-btn').addEventListener('click', translateHandler)
