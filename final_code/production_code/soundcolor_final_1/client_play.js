window.addEventListener('load', init)


function init() {
  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');
  // console.log(video);

  // Canvas element on the page
  var canvas = document.getElementById('thecanvas');
  var context = canvas.getContext('2d');

  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;


  ///////// VIDEO SECTION /////////
  // Constraints - what do we want?
  let constraints = {
    audio: false,
    video: true
  };

  // Prompt the user for permission, get the stream
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    /* Use the stream */

    // Attach to our video object
    video.srcObject = stream;

    // Wait for the stream to load enough to play
    video.onloadedmetadata = function (e) {
      video.play();
      draw();
    };
  })
    .catch(function (err) {
      /* Handle the error */
      alert(err);
    });


  /////////////////// DROP DOWN MENU /////////////////////
  var x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        console.log('changed!');

        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;

        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            console.log('i: ' + i); //playback = 1; mousemove = 2

            //////////// SELECT MODE HERE///////////////////
            let evl = null;

            if (i === 1) {
              let playButtonDiv = document.getElementById('bottom-button-play-div');
              let pauseButtonDiv = document.getElementById('bottom-button-pause-div');
              playButtonDiv.style.display = 'inline-block';

              evl = i;
              console.log("evl:" + evl);
              if (evl != null) {
                console.log('playback')
                enableFakePick();
              }
            } else if (i === 2) {
              // show color with pick function
              console.log('mouse move')
              // enableMouseMove(x, y);
              // let x = e.clientX; //mouse x pos
              // let y = e.clientY; //mouse y pos

              // console.log('mousex pos: ' + x);
              // console.log('mousey pos: ' + y);
              // canvas.addEventListener('mousemove', pick(x,y));
            }

            h.innerHTML = this.innerHTML; //change innerhtml
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  ///ENABLE MOUSE MOVE ////
  function enableMouseMove(x, y) {
    // let x = e.clientX; //mouse x pos
    // let y = e.clientY; //mouse y pos
    // console.log('mousex pos: ' + x);
    // console.log('mousey pos: ' + y);
    fakePick(x, y);
  }



  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);



  /////////////////// DRAW LOOP /////////////////////

  ///////////////// FAKE PICK WHEN PLAYBACK MODE//////////////////////
  function enableFakePick() {
    console.log('enable fake pick');
    // // play button
    let playButtonDiv = document.getElementById('bottom-button-play-div');
    let pauseButtonDiv = document.getElementById('bottom-button-pause-div');

    playButtonDiv.addEventListener('click', () => {
      moveFakePick();
      console.log('play!')
      playButtonDiv.style.display = "none";
      pauseButtonDiv.style.display = "inline-block";
    });

    pauseButtonDiv.addEventListener('click', () => {
      stopMoveFakePick();
      console.log('pause!');

      playButtonDiv.style.display = "inline-block";
      //playButton.getElementsByTagName('img').style.visibility = 'visible';

      pauseButtonDiv.style.display = 'none'; //pause icon hidden
      // pauseButton.getElementsByTagName('img').style.visibility = 'hidden';
    });
    ///////////// PLAY /////////////
    let playing = false;


    function moveFakePick() {
      isPlaying = true;
      playing = setInterval(animateFakePick, 80); // every 1 sec move the x position by 100
      playButtonDiv.style.block = "none";
      pauseButtonDiv.style.visibility = 'inline-block'; //pause icon hidden
    }

    //////////// PAUSE ///////////
    function stopMoveFakePick() {
      isPlaying = false;
      clearInterval(playing);
    }

  };


  // function disableFakePick() {
  //   let playButtonDiv = document.getElementById('bottom-button-play-div');
  //   let pauseButtonDiv = document.getElementById('bottom-button-pause-div');
  //   playButtonDiv.style.display = 'none';
  //   pauseButtonDiv.style.display = 'none';
  //   // playButtonDiv.style.visibility = 'hidden';
  //   // pauseButtonDiv.style.visibility = 'hidden';
  // }

  // function enableMousePick(x, y) {
  //   console.log('enable mouse pick!');
  //   canvas.addEventListener('mousemove', pick(x, y));
  // }

  ///////////VARIABLES FOR ANIMATE FAKE PICK///////////////
  let fakeX = window.innerWidth / 36;
  let fakeY = window.innerHeight / 24;
  let binSizeX = window.innerWidth / 13.75;
  let binSizeY = window.innerHeight / 9;
  let originFakeX = window.innerWidth / 36;
  let originFakeY = window.innerHeight / 24;

  /////////ANIMATE FAKE PICK ////////
  function animateFakePick() {
    fakeX = fakeX + binSizeX;
    fakeY;

    //if fake x is at edge of canvas move fake y down one row
    // then move fake y across the opposite way
    if (fakeX >= canvas.width) {
      fakeY = fakeY + binSizeY;
      fakeX = originFakeX;
    }

    //if fake Y is at canvas bottom, move to origin
    if (fakeY >= canvas.height) {
      fakeY = originFakeY;
      fakeX = fakeX + binSizeX;
    }

    // console.log('originFakeX: ' + originFakeX);
    // console.log('binSize: ' + binSize);
    // console.log('fakeX: ' + fakeX);

    // drawRect(fakeX, fakeY, binSize); //moved drawRect function to loop section
    //function to change which pixel is picked
    fakePick(fakeX, fakeY);
  }

  // console.log("fakeX, fakeY :" + fakeX + ','+ fakeY);

  ///////// OG PICK FUNCTION: MOVES THROUGH CANVAS /////////
  var currentlyPicking = false;


  //////////////// FAKE PICK ///////////////
  function fakePick(x, y) {
    if (!currentlyPicking) {
      currentlyPicking = true;
      //get color info
      //let color = document.getElementById("thecolor");
      //let colorText = document.getElementById("colortext");
      let infoText = document.getElementById("infotext");
      let colorCircle = document.getElementById('colorcircle');
      let colorFrequencyText = document.getElementById('color-frequency-number'); //text div
      let soundFrequencyText = document.getElementById('sound-frequency-number'); //text div

      let pixel = context.getImageData(x, y, 1, 1); //x y pos of ever 1 x 1 pixel 
      let data = pixel.data;
      let rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';

      let r = data[0];
      let g = data[1];
      let b = data[2];

      //console.log("r: " + r + " g: " + g + " b: " + b);

      //find hsl from rgb
      RGBToHSL(r, g, b);

      ///////* SECTION FOR GETTING SOUND + COLOR HZ INFO -> PUT IN INNERHTML */////////////
      let frequencyInfo = RGBToHSL(r, g, b); //change frequency text
      //console.log(frequencyInfo);

      let splitFrequencyInfo = frequencyInfo.split(',', 2);
      // console.log(splitFrequencyInfo);

      let colorFrequencyInfo = splitFrequencyInfo[0];
      let soundFrequencyInfo = splitFrequencyInfo[1];

      console.log(colorFrequencyInfo);
      console.log(soundFrequencyInfo);

      //change dom elements
      colorFrequencyText.innerHTML = colorFrequencyInfo; //change frequency text
      soundFrequencyText.innerHTML = soundFrequencyInfo; //change frequency text

      colorCircle.style.background = rgb; //change color circle

      setTimeout(function () { currentlyPicking = false; }, 100);
    }
  }


  // function pick(e) {
  //   if (!currentlyPicking) {
  //     currentlyPicking = true;
  //     //get color info
  //     let color = document.getElementById("thecolor");
  //     let colorText = document.getElementById("colortext");
  //     let hslText = document.getElementById("hsltext");
  //     //let frequencyText = document.getElementById("frequencytext");

  //     let x = e.clientX; //mouse x pos
  //     let y = e.clientY; //mouse y pos

  //     console.log('mousex pos: ' + x);
  //     console.log('mousey pos: ' + y);

  //     let pixel = context.getImageData(x, y, 1, 1); //x y pos of ever 1 x 1 pixel 
  //     let data = pixel.data;

  //     console.log('data: ' + data);
  //     let rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';

  //     let r = data[0];
  //     let g = data[1];
  //     let b = data[2];

  //     console.log("r: " + r + " g: " + g + " b: " + b);

  //     //find hsl from rgb
  //     RGBToHSL(r, g, b);

  //     //change dom elements
  //     color.style.background = rgb;
  //     colorText.innerHTML = rgb;
  //     hslText.innerHTML = RGBToHSL(r, g, b);

  //     // console.log("wavelength text: " + hslText.innerHTML);
  //     setTimeout(function () { currentlyPicking = false; }, 100);
  //   }
  // }



  //////////* DRAW FUNCTION *//////////////

  function draw() {
    var dataUrl = thecanvas.toDataURL();
    //console.log(dataUrl);

    let options = {
      pixelWidth: 500,
      pixelHeight: 500
    };

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    Pixelate(imageData, imageData, options);
    context.putImageData(imageData, 0, 0);

    //setup the animation loop. starts when the video begins to play
    video.onplay = function (e) {
      setTimeout(function () {
        setInterval(updateCanvas, 30);
        let video = document.getElementById('thevideo');
        let canvas = document.getElementById('thecanvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }, 1000);
    };
  };


  ////* DRAW ELLIPSE *//////
  function drawEllipse(x, y) {
    let r = 8;

    context.fillStyle = "#D8D8D8";
    context.beginPath();
    context.arc(x + r, y + r, r, 0, 2 * Math.PI);
    context.fill();
  }


  /////////* UPDATE CANVAS AND PIXEL EFFECT *////////////
  //update canvas + pixel effect called here
  function updateCanvas() {
    let video = document.getElementById('thevideo');
    let canvas = document.getElementById('thecanvas');
    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0);

    //this is where you change pixel size
    let options = {
      pixelWidth: 8,
      pixelHeight: 8
    };

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    Pixelate(imageData, imageData, options);
    ctx.putImageData(imageData, 0, 0)

    //animate rect here
    //drawRect(fakeX, fakeY, binSize);

    //mouse move 
    // canvas.addEventListener('mousemove', mouseMove());

    //animate ellipse here
    drawEllipse(fakeX, fakeY);

    //setup the animation loop. starts when the video begins to play
    video.onplay = function (e) {
      setTimeout(function () {
        setInterval(updateCanvas, 30);
        let video = document.getElementById('thevideo');
        let canvas = document.getElementById('thecanvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }, 1000);
    };
  }

  function mouseMove(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    console.log("mousex:" + mouseX);
    console.log("mousey:" + mouseY);
  }


  ////* PIXELATE VID *//////
  // Source: http://blog.acipo.com/js-canvas-pixelate/
  function Pixelate(src, dst, opt) {

    var xBinSize = opt.pixelWidth * 10,
      yBinSize = opt.pixelHeight * 10;

    var xSize = src.width,
      ySize = src.height,
      srcPixels = src.data, //what is src.data capturing?
      dstPixels = dst.data,
      x, y, i;

    var pixelsPerBin = xBinSize * yBinSize,
      red, green, blue, alpha,
      nBinsX = Math.ceil(xSize / xBinSize),
      nBinsY = Math.ceil(ySize / yBinSize),
      xBinStart, xBinEnd, yBinStart, yBinEnd,
      xBin, yBin, pixelsInBin;

    for (xBin = 0; xBin < nBinsX; xBin += 1) {
      for (yBin = 0; yBin < nBinsY; yBin += 1) {

        // Initialize the color accumlators to 0
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;

        // Determine which pixels are included in this bin
        xBinStart = xBin * xBinSize;
        xBinEnd = xBinStart + xBinSize; //for xBin=0 it is 10
        yBinStart = yBin * yBinSize;
        yBinEnd = yBinStart + yBinSize;


        // Add all of the pixels to this bin!
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= xSize) { continue; }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= ySize) { continue; }
            i = (xSize * y + x) * 4; //how is i defined? why x4?
            red += srcPixels[i + 0];
            green += srcPixels[i + 1];
            blue += srcPixels[i + 2];
            alpha += srcPixels[i + 3];
            pixelsInBin += 1;
          }
        }

        // Make sure the channels are between 0-255
        red = red / pixelsInBin;
        green = green / pixelsInBin;
        blue = blue / pixelsInBin;
        alphas = alpha / pixelsInBin;

        // Draw this bin
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= xSize) { continue; }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= ySize) { continue; }
            i = (xSize * y + x) * 4;
            dstPixels[i + 0] = red;
            dstPixels[i + 1] = green;
            dstPixels[i + 2] = blue;
            dstPixels[i + 3] = alpha;
          }
        }
      }
    }
    //console.log('xBinStart: ' + xBinStart);
  };

  ///////* CONVERT RGB TO HSL *//////
  /* source: https://css-tricks.com/converting-color-spaces-in-javascript/*/
  function RGBToHSL(r, g, b) {
    //make r, g, b fractions of 1
    r = r / 255;
    g = g / 255;
    b = b / 255;

    //find greatest and smallest channel value
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // calculate hue
    // if no difference
    if (delta == 0)
      h = 0;
    //red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    //green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    //blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    //make neg hues positive behind 360
    if (h < 0)
      h += 360;

    //calculate lightness
    l = (cmax + cmin) / 2;

    //calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    //multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    //console.log('h: ' + h);

    //convert hue to wavelength
    //https://stackoverflow.com/questions/11850105/hue-to-wavelength-mapping
    // Estimating that the usable part of the visible spectrum is 450-620nm, 
    // with wavelength (in nm) and hue value (in degrees):
    let wavelength = Math.ceil(620 - 170 / 270 * h);
    //console.log('wavelength: ' + wavelength);

    //convert wavelength (nm) to frequency (THz)
    findFrequency(wavelength);

    let colorFrequency = findFrequency(wavelength);
    let soundFrequency = findFreqPitch(colorFrequency);

    console.log("hsl(" + h + "," + s + "%," + l + "%)" + "; " + "wavelength: " + wavelength + ";  ");

    return (colorFrequency + "," + soundFrequency);

    // return(wavelength);
  }
};

/////* FIND FREQUENCY */////
// wl = wavelength
function findFrequency(wl) {
  let frequency;
  frequency = Math.ceil(3 * (Math.pow(10, 5)) / wl);

  playFreq(frequency);
  return frequency;
}

/////////////////// FUNCTIONS TO MAP FREQ //////////////////

//map for color wavelengths
// linearly maps value from the range (a..b) to (c..d)
function mapRange(colorFrequency, low1, high1, low2, high2) {
  let freqDrawValue = low2 + (high2 - low2) * (colorFrequency - low1) / (high1 - low1);
  // console.log("freqDrawValue: " + freqDrawValue);
  return freqDrawValue;
}

/////////* PLAY PITCH  *////////
//set up color + pitch frequency
let lowColFreq = 400;
let highColFreq = 789;
let lowPitchFreq = 0;
let highPitchFreq = 2000;

///// * PLAY COLOR FREQ */////////
function playFreq(frequency) {
  let freqPitch = Math.floor(mapRange(frequency, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
  //console.log("freq pitch: " + freqPitch);
  startOsc(freqPitch);
  return freqPitch
}

function findFreqPitch(frequency) {
  let freqPitch = Math.floor(mapRange(frequency, lowColFreq, highColFreq, lowPitchFreq, highPitchFreq));
  //console.log("freq pitch: " + freqPitch);
  return freqPitch
}

//////////* SOUND MUST HAVES */////////////
// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator; // = audioCtx.createOscillator();
// let now = audioCtx.currentTime;


//frequency is passed to this function from input button
function startOsc(frequency) {
  oscillator = audioCtx.createOscillator(); //create oscillator each time function runs

  oscillator.type = 'square'; //this can't be sine for some reason
  oscillator.frequency.value = frequency; //frequency val to be passed in on event click
  // oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz *** THIS MAKES IT INFLEXIBLE / NOT ABLE TO CHANGE THE FREQUENCY WITH THIS **** DONT USE ****

  //console.log("sound frequency: " + frequency);

  oscillator.start(audioCtx.currentTime);

  // Create GainNode	
  gain = audioCtx.createGain(); // Create gain node
  gain.gain.value = 2; // Set gain to half volume

  // Connect the Nodes
  oscillator.connect(gain); // Connect oscillator to gain
  gain.connect(audioCtx.destination); // Connect gain to output

  oscillator.stop(audioCtx.currentTime + 0.1);
}

/*DUMPSTER */
  ///////* PICK COLOR FROM CANVAS *//////
  // function pick(e) {
  //   if (!currentlyPicking) {
  //     currentlyPicking = true;
  //     //get color info
  //     let color = document.getElementById("thecolor");
  //     let colorText = document.getElementById("colortext");
  //     let hslText = document.getElementById("hsltext");
  //     //let frequencyText = document.getElementById("frequencytext");

  //     let x = e.clientX; //mouse x pos
  //     let y = e.clientY; //mouse y pos

  //     console.log('mousex pos: ' + x);
  //     console.log('mousey pos: ' + y);

  //     let pixel = context.getImageData(x, y, 1, 1); //x y pos of ever 1 x 1 pixel 
  //     let data = pixel.data;

  //     console.log('data: ' + data);
  //     let rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';

  //     let r = data[0];
  //     let g = data[1];
  //     let b = data[2];

  //     console.log("r: " + r + " g: " + g + " b: " + b);

  //     //find hsl from rgb
  //     RGBToHSL(r, g, b);

  //     //change dom elements
  //     color.style.background = rgb;
  //     colorText.innerHTML = rgb;
  //     hslText.innerHTML = RGBToHSL(r, g, b);

  //     // console.log("wavelength text: " + hslText.innerHTML);
  //     setTimeout(function () { currentlyPicking = false; }, 100);
  //   }
  // }