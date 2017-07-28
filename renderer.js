// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const io = require('socket.io-client');

const socket = io('http://127.0.0.1:8012');
let currentStatus = "WORK";

socket.on('pomodoro', function(data) {
  if (currentStatus !== data.status) {
    currentStatus = data.status;
    switch (data.status) {
      case 'WORK':
        message = 'Let\'s work!!';
      case 'BREAK':
        message = 'You can have some break';
      case 'LONG BREAK':
        message = 'It\'s finally the long break time';
    }
    let myNotification = new Notification(data.status, {
      body: message,
    });
  }

  document.getElementById("timer").innerHTML = data.timer;
  document.getElementById("status").innerHTML = data.status;
  document.getElementById("round").innerHTML = '#' + data.round;

  if (data.status != 'WORK') {
    document.getElementById("main").className = "pause";
  } else {
    document.getElementById("main").className = "work";
  }
})
