const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

let sock1, sock2, sock3;

var users = [];

io.on('connection', function(socket) {
  socket.on('get_player', (id)=>{
    io.emit('load_player', playerID);
  })
  socket.on('msg', (text)=>{
    io.emit('msg', text);
  })

  // socket.on('disconnect', function() {
  //   console.log('A user has disconnect');
  //   let i = users.indexOf(socket);
  //   delete allClients[i];
  // });

/*
  -client code
  let sock = io();
  sock.on('msg', function(text){
    
  })
*/
  users.push(socket);

  if (!sock1){
    sock1 = socket;
  }
  else if (!sock2){
    sock2 = socket;
  }
  else if (!sock3){
    sock3 = socket;
  }
  else if(users.length === 4){
    new game(sock1,sock2,sock3,socket);
    socket.emit('msg', 'Match started!')
    sock1=sock2=sock3=null;
  }
});


const port = process.env.PORT || 8000;

server.listen(port);
app.use(express.static(__dirname + '/../'));


module.exports = app;

class game {
  constructor(sock1,sock2,sock3,sock4){
    this.players=[sock1,sock2,sock3,sock4];
    this.turn=0;

    this.init();
  }
  init(){
    this.players.forEach((sock) =>{
      sock.emit('msg', 'game start!')
    })
  }
}
