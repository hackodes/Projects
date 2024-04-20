let pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

const inputField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

const imageDiv = document.getElementById('image-div')
const types = document.getElementById('types')

function clearData() {
  imageDiv.innerHTML = ''
  types.innerHTML = ''
}

function clickHandler() {
  const inputText = inputField.value

  clearData()

  fetch(pokemonUrl + inputText.toLowerCase())
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.id) {
        document.getElementById('pokemon-name').textContent = data.name.toUpperCase()
        document.getElementById('pokemon-id').textContent = '#' + data.id
        const sprite = document.createElement('img')
        sprite.id = 'sprite'
        sprite.src = data.sprites.front_default
        imageDiv.appendChild(sprite)
        document.getElementById('weight').textContent = data.weight
        document.getElementById('height').textContent = data.height

        data.types.forEach((type) => {
          let typeCategory = document.createElement('span')
          typeCategory.className = `type-span ${type.type.name}`
          typeCategory.textContent = type.type.name.toUpperCase()

          types.appendChild(typeCategory)
        })

        document.getElementById('hp').textContent = data.stats[0].base_stat
        document.getElementById('attack').textContent = data.stats[1].base_stat
        document.getElementById('defense').textContent = data.stats[2].base_stat
        document.getElementById('special-attack').textContent = data.stats[3].base_stat
        document.getElementById('special-defense').textContent = data.stats[4].base_stat
        document.getElementById('speed').textContent = data.stats[5].base_stat
      } else {
        alert('Pokémon not found')
      }
    })
    .catch((error) => {
      alert('Pokémon not found')
    })
}

searchButton.addEventListener('click', clickHandler)
