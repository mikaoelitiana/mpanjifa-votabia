// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const io = require('socket.io-client');
const { remote } = require('electron');
const settings = require('electron-settings');
const currentWindow = remote.getCurrentWindow();

const server = settings.get('server', 'https://votabia-lxjgfxtqoa.now.sh');
const socket = io(server);

let tray = new remote.Tray(__dirname + '/tomato.png');
let currentStatus = "WORK";

window.addEventListener('beforeunload', function(){
  tray.destroy();
});

tray.on('click', function() {
  currentWindow.show();
});

socket.on('pomodoro', function(data) {
  if (currentStatus !== data.status) {
    currentStatus = data.status;
    switch (data.status) {
      case 'WORK':
        message = 'Let\'s work!!';
        break;
      case 'BREAK':
        message = 'You can have some rest.';
        break;
      case 'LONG BREAK':
        message = 'It\'s finally time for a long break.';
        break;
      case 'STOP':
        message = 'Just stop.';
        break;
    }
    let myNotification = new Notification(data.status, {
      body: message
    });
  }

  document.getElementById("timer").innerHTML = data.timer;
  document.getElementById("status").innerHTML = data.status;
  document.getElementById("round").innerHTML = '#' + data.round;

  tray.setTitle((data.status == 'WORK' ? 'ⓦ ': 'ⓑ ') + data.timer);

  if (data.status != 'WORK') {
    document.getElementById("main").className = "pause";
  } else {
    document.getElementById("main").className = "work";
  }
})
