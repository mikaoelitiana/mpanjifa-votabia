// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const io = require('socket.io-client');

const socket = io('http://192.168.100.25:8012');

socket.on('pomodoro', function(data) {
  document.getElementById("timer").innerHTML = data.timer;
  document.getElementById("status").innerHTML = data.status;
  if (data.status != 'WORK') {
    document.getElementById("main").className = "pause";
  } else {
    document.getElementById("main").className = "work";
  }
})
