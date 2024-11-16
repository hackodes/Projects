export function setupSocket(io, callbacks) {
  const socket = io()

  socket.on("player-connected", (id) => {
    callbacks.onPlayerConnected(id)
  })

  socket.on("message", (message) => {
    callbacks.onMessage(message)
  })

  socket.on("update-player-list", (playerList) => {
    callbacks.onUpdatePlayerList(playerList)
  })

  socket.on("update-collectibles", (collectibleItems) => {
    callbacks.onUpdateCollectibles(collectibleItems)
  })

  const emitPlayerDetails = (player) => {
    socket.emit("register-player", player)
  }

  const emitCollectibleUpdate = (collectibles) => {
    socket.emit("spawn-collectible", collectibles)
  }

  const emitPlayerPosition = (player) => {
    socket.emit("update-player-position", player)
  }

  const emitRequestCollectibles = () => {
    socket.emit("request-collectibles")
  }

  const emitMessage = (message) => {
    socket.emit("broadcast-message", message)
  }

  return {
    emitPlayerDetails,
    emitCollectibleUpdate,
    emitPlayerPosition,
    emitRequestCollectibles,
    emitMessage,
  }
}
