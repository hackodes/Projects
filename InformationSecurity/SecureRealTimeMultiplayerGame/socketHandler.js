let connections = [];
let players = [];
let collectibleItems = [];

function removePlayer(id) {
  return players.filter(player => player.id !== id);
}

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log('New player has joined the game. Player ID - ', socket.id);
    connections.push(socket);

    socket.emit('player-connected', socket.id);

    socket.on('broadcast-message', (message) => {
      socket.broadcast.emit('message', message);
    });

    socket.on('register-player', (player) => {
      players.push(player);
      io.emit('update-player-list', players);
    });

    socket.on('spawn-collectible', (collectible) => {
      collectibleItems = collectible;
      io.emit('update-collectibles', collectibleItems);
    });

    socket.on('request-collectibles', () => {
      socket.emit('update-collectibles', collectibleItems);
    });

    socket.on('update-player-position', ({ x, y, score, id }) => {
      players.forEach((player) => {
        if (player.id === id) {
          player.x = x;
          player.y = y;
          player.score = score;
        }
      });
      io.emit('update-player-list', players);
    });

    socket.on('disconnect', () => {
      console.log('Player has left the game. Player ID - ', socket.id);
      players = removePlayer(socket.id);
      io.emit('update-player-list', players);
    });
  });
}

module.exports = socketHandler;