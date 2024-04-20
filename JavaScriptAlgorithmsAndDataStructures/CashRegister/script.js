let price = 19.5
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]

const inputField = document.getElementById('cash')
const purchaseButton = document.getElementById('purchase-btn')
const changeDueDiv = document.getElementById('change-due')

const values = [
  ['ONE HUNDRED', 10000],
  ['TWENTY', 2000],
  ['TEN', 1000],
  ['FIVE', 500],
  ['ONE', 100],
  ['QUARTER', 25],
  ['DIME', 10],
  ['NICKEL', 5],
  ['PENNY', 1],
]

function getChange(index, change, registerCash, holderCash) {
  while (change > 0 && index < values.length) {
    let name = values[index][0]
    let val = values[index][1]
    if (registerCash[name] > 0 && change - val > 0) {
      holderCash[name] = 0
      while (registerCash[name] > 0 && change - val >= 0) {
        holderCash[name] = holderCash[name] + val / 100
        registerCash[name] = parseInt(registerCash[name] - val)
        change = change - val
      }
    }
    index++
  }
  return change
}

function isChangeZero(change) {
  if (change == 0) {
    return {
      status: 'CLOSED',
      change: cid,
    }
  }
}

function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100
  let holderCash = {}
  let registerCash = {}
  let index = 0
  isChangeZero()
  cid.forEach((money) => {
    registerCash[money[0]] = parseInt(money[1] * 100)
  })
  change = getChange(index, change, registerCash, holderCash)
  if (change == 0) {
    var hasCash = false
    Object.keys(registerCash).forEach((key) => {
      if (registerCash[key] > 0) {
        hasCash = true
      }
    })
    if (hasCash == true) {
      return {
        status: 'OPEN',
        change: Object.keys(holderCash).map((key) => {
          var object = [key, holderCash[key]]
          console.log(JSON.stringify(object))
          return object
        }),
      }
    } else {
      return {
        status: 'CLOSED',
        change: cid,
      }
    }
  }
  return {
    status: 'INSUFFICIENT_FUNDS',
    change: [],
  }
}

function clickHandler() {
  const inputText = inputField.value

  if (isNaN(inputText)) {
    alert('Please enter a valid number')
  } else {
    if (inputText < price) {
      alert('Customer does not have enough money to purchase the item')
    } else if (inputText == price) {
      changeDueDiv.textContent = 'No change due - customer paid with exact cash'
    } else {
      const cash = inputText
      let result = checkCashRegister(price, cash, cid)

      if (result['status'] === 'INSUFFICIENT_FUNDS') {
        changeDueDiv.textContent = 'Status: ' + result['status']
      } else {
        changeDueDiv.textContent = ''

        let statusText = document.createElement('p')
        statusText.textContent = `Status: ${result['status']} `
        changeDueDiv.appendChild(statusText)

        result['change'].forEach((change) => {
          let changeText = document.createElement('p')
          changeText.textContent = `${change[0]}: $${change[1]}`
          changeDueDiv.appendChild(changeText)
        })
      }
    }
  }
}

purchaseButton.addEventListener('click', clickHandler)
