// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

//SOCKET CONNECTION + ROOMS
// Create socket connection
let io = require('socket.io').listen(server);

// Get the array of rooms
let rooms = io.sockets.adapter.rooms;
let roomNum = 0;
// How many in a group? Default is 2
let NUM_PARTNERS = 2;


// Listen for clients to connect
io.sockets.on('connection',

  function (socket) {
    console.log('An input client connected: ' + socket.id);

    // Join a room
    joinRoom(socket);

    socket.on('username', function (senderUsername) {

      let room = socket.room;
      let data = senderUsername;
      // console.log(data);
      let members = rooms[room].sockets;
      // console.log(members);
      let sender = socket.id;
      // console.log('sender: ' + sender);
      let receiver;
      for (member in members) {
        if (member != sender) {
          receiver = member;
          // console.log('receiver: ' + receiver);
        }
      }

      // socket.to(room).emit('connectedUsername', data);
      socket.broadcast.to(receiver).emit('connectedUsername', data);
    });


    /* IGNORE TEXT MSG FOR NOW
    // Listen for data messages
    socket.on('text', function (data) {
      // Data comes in as whatever was sent, including objects
      //console.log("Received: 'message' " + data);
      // Which private room does this client belong to?
      let room = socket.room;

      // Share data to all members of room
      socket.to(room).emit('text', data);
    }
*/

    /////// MERGED SECTION ///////

    // listen for 'image' event then emit to other sockets
    socket.on('image', function (data) {
      io.sockets.emit('image', data);
    });

    // listen for 'position' event then emit to other sockets
    socket.on('position', function (data) {
      io.sockets.emit('position', data);
    })

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('otherevent', function (data) {
      // Data comes in as whatever was sent, including objects
      console.log("Received: 'otherevent' " + data);
    });

    //SAY WHO YOU ARE PARTNERED WITH
    socket.on('istyping', function () {
      let room = socket.room;
      socket.to(room).emit('istyping');
    });

    //SAY WHEN PARTNER LEFT ROOM
    // Listen for this client to disconnect
    // Tell partners this client disconnected
    socket.on('disconnect', function () {
      console.log("Client has disconnected " + socket.id);

    
      // Which room was this client in?
      let room = socket.room;
      // Tell others in room client has left
      if (rooms[room]) {
        socket.to(room).emit('leave room');
      }

    });
  });



// Join room
function joinRoom(socket) {
  // First, add client to incomplete rooms
  for (let r in rooms) {
    let room = rooms[r];
    if (room.isPrivate) {
      if (room.length < NUM_PARTNERS) {
        addSocketToRoom(socket, r);
        return;
      }
    }
  }

  // If there are no incomplete rooms, create new room and join it
  addSocketToRoom(socket, roomNum);
  roomNum++;
}

// Add client to room and record which room it was added to
function addSocketToRoom(socket, r) {
  socket.join(r);
  rooms[r].isPrivate = true;
  socket.room = r;
  console.log(rooms);
}
