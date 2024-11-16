import Player from "./Player.mjs"
import Collectible from "./Collectible.mjs"
import { setupSocket } from "./setupSocket.mjs"
import { width, height, avatarHeight, avatarWidth, itemHeight, itemWidth } from "./constants.mjs"

const canvas = document.getElementById("game-window")
const context = canvas.getContext("2d")

let dungeonBackgroundCanvas
const leaderboardCanvas = document.getElementById("leaderboard")
const leaderboardContext = leaderboardCanvas.getContext("2d")

let collectibleItem = []
let playerId
let player
let players = []
let playerSpeed = 12

let keysPressed = {}

const socketCallbacks = {
  onPlayerConnected: (id) => {
    playerId = id
    socketInterface.emitMessage(`${playerId} is connected`)
    player = new Player({ x: 0, y: 0, score: 0, id: id })
    socketInterface.emitPlayerDetails(fetchPlayerDetails(player))
    socketInterface.emitRequestCollectibles()
  },
  onMessage: (message) => {
    console.log(message)
  },
  onUpdatePlayerList: (playerList) => {
    players = playerList
    buildLevel(players, collectibleItem)
    drawLeaderboard(players, playerId)
  },
  onUpdateCollectibles: (collectibleItems) => {
    collectibleItem = collectibleItems
    if (collectibleItem.length === 0) {
      collectibleItem = [generateCollectible()]
      socketInterface.emitCollectibleUpdate(collectibleItem)
    } else {
      buildLevel(players, collectibleItem)
    }
  },
}

const updatePlayer = (player) => {
    socketInterface.emitPlayerPosition({
      x: player.x,
      y: player.y,
      score: player.score,
      id: player.id,
    })
  }
  
const socketInterface = setupSocket(io, socketCallbacks)

function drawLeaderboard(players, currentPlayerId) {
  leaderboardCanvas.width = leaderboardCanvas.width
  leaderboardContext.fillStyle = "rgba(0, 0, 0, 0.8)"
  leaderboardContext.fillRect(0, 0, leaderboardCanvas.width, leaderboardCanvas.height)

  leaderboardContext.fillStyle = "white"
  leaderboardContext.font = "16px Arial"
  leaderboardContext.textAlign = "left"
  leaderboardContext.fillText("Leaderboard:", 10, 20)

  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)

  rankedPlayers.forEach((player, index) => {
    const rank = index + 1
    const isCurrentPlayer = player.id === currentPlayerId
    const textColor = isCurrentPlayer ? "yellow" : "white"

    leaderboardContext.fillStyle = textColor
    leaderboardContext.fillText(`${rank}. Player ${player.id}: ${player.score}`, 10, 40 + index * 25)
  })
}

function addDungeonTexture(ctx) {
  ctx.globalAlpha = 0.2
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 5
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.5})`
    ctx.fillRect(x, y, size, size)
  }
  ctx.globalAlpha = 1.0
}

function generateDungeonBackground() {
  dungeonBackgroundCanvas = document.createElement("canvas")
  dungeonBackgroundCanvas.width = width
  dungeonBackgroundCanvas.height = height

  const ctx = dungeonBackgroundCanvas.getContext("2d")

  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      const r = 101 + Math.floor(Math.random() * 1)
      const g = 60 + Math.floor(Math.random() * 1)
      const b = 33 + Math.floor(Math.random() * 1)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fillRect(x, y, 50, 50)
    }
  }
  addDungeonTexture(ctx)
}

function buildDungeonBackground() {
  if (dungeonBackgroundCanvas) {
    context.drawImage(dungeonBackgroundCanvas, 0, 0)
  }
}

function canPlayerMove(player, direction) {
  switch (direction) {
    case "up":
      if (player.y - playerSpeed < 0) {
        return false
      }
      return true
    case "down":
      if (player.y + avatarHeight + playerSpeed > height) {
        return false
      }
      return true
    case "left":
      if (player.x - playerSpeed < 0) {
        return false
      }
      return true
    case "right":
      if (player.x + avatarWidth + playerSpeed > width) {
        return false
      }
      return true
  }
}

const avatarCache = {}

function createPlayerAvatar(player) {
  if (!avatarCache[player.avatar]) {
    const img = new Image()
    img.src = player.avatar
    avatarCache[player.avatar] = img
    img.onload = () => {
      context.drawImage(img, player.x, player.y, avatarWidth, avatarHeight)
    }
  } else {
    context.drawImage(avatarCache[player.avatar], player.x, player.y, avatarWidth, avatarHeight)
  }
}

function createItem(arr) {
  arr.forEach((collectible) => {
    const coinGradient = context.createRadialGradient(
      collectible.x + itemWidth / 2,
      collectible.y + itemHeight / 2,
      5,
      collectible.x + itemWidth / 2,
      collectible.y + itemHeight / 2,
      itemWidth / 2
    )

    coinGradient.addColorStop(0, "rgb(255, 223, 0)")
    coinGradient.addColorStop(0.7, "rgb(204, 164, 0)")
    coinGradient.addColorStop(1, "rgb(143, 108, 0)")

    context.fillStyle = coinGradient

    context.beginPath()
    context.arc(collectible.x + itemWidth / 2, collectible.y + itemHeight / 2, itemWidth / 2, 0, Math.PI * 2)
    context.fill()

    const highlightGradient = context.createRadialGradient(
      collectible.x + itemWidth / 2,
      collectible.y + itemHeight / 2,
      5,
      collectible.x + itemWidth / 2,
      collectible.y + itemHeight / 2,
      itemWidth / 3
    )
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
    highlightGradient.addColorStop(0.7, "rgba(255, 255, 255, 0.2)")
    context.fillStyle = highlightGradient
    context.beginPath()
    context.arc(collectible.x + itemWidth / 2, collectible.y + itemHeight / 2, itemWidth / 3, 0, Math.PI * 2)
    context.fill()
  })
}

function buildLevel(players, collectibleItem) {
  canvas.width = width
  canvas.height = height

  buildDungeonBackground()
  players.forEach((player) => {
    createPlayerAvatar(player)
  })

  createItem(collectibleItem)
}

generateDungeonBackground()

window.addEventListener("keydown", (e) => {
  if (player !== undefined) {
    keysPressed[e.key.toLowerCase()] = true

    const directions = [
      { key: ["w", "arrowup"], move: "up" },
      { key: ["s", "arrowdown"], move: "down" },
      { key: ["a", "arrowleft"], move: "left" },
      { key: ["d", "arrowright"], move: "right" },
    ]

    directions.forEach((direction) => {
      if (direction.key.some((key) => keysPressed[key])) {
        if (canPlayerMove(player, direction.move)) {
          player.movePlayer(direction.move, playerSpeed)
        }
      }
    })
    updatePlayer(player)
    handleCollisions()
  }
})

window.addEventListener("keyup", (e) => {
  keysPressed[e.key.toLowerCase()] = false
})

function handleCollisions() {
  let newList = []
  collectibleItem.forEach((item) => {
    let collision = player.collision(item)
    if (collision) {
      player.score += item.value
    } else {
      newList.push(item)
    }
  })

  if (newList.length < collectibleItem.length) {
    collectibleItem = newList
    collectibleItem.push(generateCollectible())
    socketInterface.emitCollectibleUpdate(collectibleItem)
    updatePlayer(player)
  }
}

const fetchPlayerDetails = (player) => {
  return { x: player.x, y: player.y, score: player.score, id: player.id, avatar: player.avatar }
}

function generateCollectible() {
  let x = Math.floor(Math.random() * (width - itemWidth))
  let y = Math.floor(Math.random() * (height - itemHeight))
  let id = "rand_id"
  let value = Math.floor(Math.random() * 10)
  return new Collectible({ x: x, y: y, value: value, id: id })
}
