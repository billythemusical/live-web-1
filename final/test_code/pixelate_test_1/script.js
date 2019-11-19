window.addEventListener('load', function() {
    // The video element on the page to display the webcam
    var video = document.getElementById('thevideo');

    // Constraints - what do we want?
    let constraints = { audio: false, video: true };

    // Prompt the user for permission, get the stream
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        /* Use the stream */

        // Attach to our video object
        video.srcObject = stream;

        // Wait for the stream to load enough to play
        video.onloadedmetadata = function(e) {
            video.play();
        draw();

        };
    })
    .catch(function(err) {
        /* Handle the error */
        alert(err);
    });

    // Canvas element on the page
    var thecanvas = document.getElementById('thecanvas');
    console.log(thecanvas);
    var thecontext = thecanvas.getContext('2d');
    console.log(thecontext);
    console.log(video);
    var draw = function() {
      console.log("It should be drawing!");
        // Draw the video onto the canvas
        thecontext.drawImage(video,0,0,video.width,video.height);

      var dataUrl = thecanvas.toDataURL();
      console.log(dataUrl);

      socket.emit('dataurl',dataUrl);

        // document.getElementById('imagefile').src = dataUrl;

        // Draw again in 3 seconds
        setTimeout(draw,3000);
    };


    thecanvas.addEventListener('mousemove', function(e) {
      console.log(e.x, e.y);
      socket.emit('coordinates', {x: e.x, y: e.y});
    });


  });


  var socket = io.connect();
  socket.on('connect', function() {
    console.log("Connected");
  });

  socket.on('coordinates', function(data) {
    document.getElementById('thediv').style.position = "absolute";
    document.getElementById('thediv').style.top = data.x + "px";
    document.getElementById('thediv').style.left = data.y + "px";
  });

  socket.on('dataurl', function(data) {
    console.log("Got Data");
    //var theimage = document.getElementById('theimage');

    var theimage = document.createElement("img");
    theimage.src = data;
    document.body.appendChild(theimage);

  });
