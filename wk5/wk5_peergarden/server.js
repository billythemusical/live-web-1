//////*  HTTP SECTION *///////
var https = require('https');
var fs = require('fs'); // Using the filesystem module
var url = require('url');

var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

function handleIt(req, res) {
  var parsedUrl = url.parse(req.url);

  var path = parsedUrl.pathname;
  if (path == "/") {
    path = "main.html";
  }

  fs.readFile(__dirname + path,

    // Callback function for reading
    function (err, fileContents) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + req.url);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200);
      res.end(fileContents);
    }
  );

  // Send a log message to the console
  console.log("Got a request " + req.url);
}

var httpServer = https.createServer(options, handleIt);
httpServer.listen(8085);

console.log('Server listening on port 8085');


//////*  WEB SOCKET PORTION *///////
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);

    // receives the client call to perform "sendPeerId"
    socket.on('sendPeerId',
      // Run this function when a message is sent
      function (data) {
        console.log("server received peer id: " + data);

        // To all clients, on io.sockets instead
        socket.broadcast.emit('otherPeerId', data); //works but going to try another thing
        // socket.broadcast.emit('otherPeerId', data); //sends to everyone but sender
      }
    );


    socket.on('disconnect', function () {
      console.log("Client has disconnected");
    });
  }
);

