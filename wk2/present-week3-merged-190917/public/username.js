let globalArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"];
let otherUser = '';

// Open and connect input socket
let socket = io();

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// Input field
let inputt;
let username;

window.addEventListener('load', randomAccentCol);

//random accent color

function randomAccentCol() {
  let gradientContainer = document.getElementsByClassName("gradientContainer");

  //not working! 
  //gradientContainer.classList.add('gradient' + [Math.floor(Math.random() * 5)]);
  
  let colors = [
    "yellow",
    "pink",
    "purple",
    "green", 
    "orange"
  ];
  
  console.log('colors: ' + colors);
  let randomIndex = Math.floor(Math.random() * colors.length);

  console.log('random index: ' + colors[randomIndex]);
  gradientContainer[0].classList.add(colors[randomIndex]);
}

function setup() {
  noCanvas();

  // Listen for changes to input field
  //inputt = select('#input');
  inputt = document.getElementById("inputt");
  inputt.addEventListener('keypress',  keyPressedInput);

  username = select('#username');
  username.elt.addEventListener('keypress', keyPressedUser);

  //inputt.input(inputChanged);

  // Listen for texts from partners
  socket.on('text', function (data) {
    console.log(data);
    display(data);
  });

  socket.on('istyping', function () {
    show();
  });

  socket.on('connectedUsername', function (user) {
    otherUser = user;
    console.log('connected to: ' + otherUser);
    // removeElements();
    // show(username);
  });

  // Remove disconnected users
  // Display "User left" message
  socket.on('leave room', function () {
    display('(they left...)');
  });
}

// Display text
function show() {
  removeElements();
  document.getElementById('displayText').innerHTML = (`${otherUser} is typing...`);
}

function display(data) {
  removeElements();
  document.getElementById('displayText').innerHTML = data;
}

function inputChanged() {
  console.log('input change!');
  socket.emit('istyping');
}

// Listen for line breaks to clear input field
function keyPressedInput(e) {
  console.log(e);
  if (e.keyCode == 13) {
    console.log(inputt.value);
    gibber(inputt.value);
    inputt.value='';
  }
  // if (keyCode == ENTER) {
  //   console.log(input.value());
  //   gibber(input.value());
  //   input.value('');
  // }
}


function keyPressedUser(e) {
  console.log(e);
  if (e.keyCode == ENTER) {
    console.log('my username: ' + username.value());
    let myUsername = username.value();
    socket.emit('username', myUsername);
    showInput();
  }
}

function showInput(){
  document.getElementById('inputt').style.visibility = "visible";
}

function gibber(thevalue) {
  let ogMessage = thevalue;
  console.log('ogMessage: ' + thevalue);
  let newMessage = randomizeMessage(ogMessage);
  console.log('newMessage: ' + newMessage);
  socket.emit('text', newMessage);
  console.log('message sent!');
}

function randomizeMessage(x) {
  //make the string into an characters
  let array = x.split('');

  //random number of characters to replace
  let randomNum = Math.round(0.22 * array.length);
  console.log("random num is " + randomNum);

  //getting a random index from for loop
  for (let i = 0; i < randomNum; i++) {

    //index numbers from random char in the message array
    let randomIndex = Math.floor(Math.random() * array.length);
    // console.log("random index: " + randomIndex);

    //index numbers from random char in globalChar array
    let globalIndex = Math.floor(Math.random() * globalArr.length);
    // console.log("global index: " + globalIndex);

    //find a character at that specific random number and then replace it with ? (as a test)
    //array[randomIndex] = "?";

    //replace the characters from [randomIndex] with characters from [globalIndex]
    if (array[randomIndex] != ' ') {
      array[randomIndex] = globalArr[globalIndex];
    }
  }
  //make into a new string
  return array.join('');
  console.log('done');
}