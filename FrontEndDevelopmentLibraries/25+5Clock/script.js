document.getElementById("time-left").disabled = true;
document.getElementById("session-length").disabled = true;
document.getElementById("break-length").disabled = true;
var audioClip = document.getElementById("beep");

var breakLength = "5";
var sessionLength = "25";
var time = "25:00";
var clickCounter = 0;
var runMode = false;
var myTimer = "";
var sessionMode = true;
var breakMode = false;
var startMode = true;
document.getElementById("break-length").innerHTML = breakLength;
document.getElementById("session-length").innerHTML = sessionLength;
document.getElementById("time-left").innerHTML = time;

function countDown() {
  if (clickCounter % 2 === 1) {
    if (runMode === false) {
      runMode = true;
      myTimer = setInterval(countDown, 1000);
    }
    if (startMode === true) {
      startMode = false;
      document.getElementById("time-left").innerHTML = time;
    } else if (startMode === false) {
      if (time === "00:00" && sessionMode === true) {
        audioClip.play();
        sessionMode = false;
        breakMode = true;
        time = breakLength + ":00";
        document.getElementById("timer-label").innerHTML = "Break Time";
        if (parseInt(breakLength) < 10) {
          time = "0" + time;
        }
        startMode = true;
        document.getElementById("time-left").innerHTML = time;
      }
      if (time === "00:00" && breakMode === true) {
        audioClip.play();
        breakMode = false;
        sessionMode = true;
        time = sessionLength + ":00";
        document.getElementById("timer-label").innerHTML = "Time";
        if (parseInt(sessionLength) < 10) {
          time = "0" + time;
        }
        startMode = true;
        document.getElementById("time-left").innerHTML = time;
      }

      if (startMode === false) {
        var firstTwoDigits = time.charAt(0) + time.charAt(1);
        var lastTwoDigits = time.charAt(3) + time.charAt(4);
        var newFirstTwo = "";
        var newLastTwo = "";

        if (lastTwoDigits === "00") {
          var firstTwo_parsed = parseInt(firstTwoDigits);
          --firstTwo_parsed;
          console.log(firstTwo_parsed);
          newFirstTwo = firstTwo_parsed.toString();
          if (firstTwo_parsed < 10) {
            newFirstTwo = "0" + newFirstTwo;
          }
          lastTwoDigits = "59";
          time = newFirstTwo + ":" + lastTwoDigits;
          document.getElementById("time-left").innerHTML = time;
        } else if (lastTwoDigits !== "00") {
          var lastTwo_parsed = parseInt(lastTwoDigits);
          --lastTwo_parsed;
          newLastTwo = lastTwo_parsed.toString();
          if (lastTwo_parsed < 10) {
            newLastTwo = "0" + newLastTwo;
          }
          time = firstTwoDigits + ":" + newLastTwo;
          document.getElementById("time-left").innerHTML = time;
        }
      }
    }
  }
  if (clickCounter % 2 === 0) {
    clearInterval(myTimer);
    runMode = false;
  }
}

function startStop() {
  clickCounter++;
  if (clickCounter % 2 === 1) {
    document.getElementById("start_stop").innerHTML = "Stop";
    document.getElementById("break-increment").disabled = true;
    document.getElementById("break-decrement").disabled = true;
    document.getElementById("session-increment").disabled = true;
    document.getElementById("session-decrement").disabled = true;
    countDown();
  }
  if (clickCounter % 2 === 0) {
    document.getElementById("break-increment").disabled = false;
    document.getElementById("break-decrement").disabled = false;
    document.getElementById("session-increment").disabled = false;
    document.getElementById("session-decrement").disabled = false;
    document.getElementById("start_stop").innerHTML = "Start";
  }
}

function reset() {
  audioClip.pause();
  audioClip.currentTime = 0;
  clickCounter = 0;
  document.getElementById("break-increment").disabled = false;
  document.getElementById("break-decrement").disabled = false;
  document.getElementById("session-increment").disabled = false;
  document.getElementById("session-decrement").disabled = false;
  document.getElementById("timer-label").innerHTML = "Time";
  clearInterval(myTimer);
  startMode = true;
  sessionMode = true;
  breakMode = false;
  runMode = false;
  myTimer = "";
  breakLength = "5";
  sessionLength = "25";
  time = sessionLength + ":00";
  document.getElementById("break-length").innerHTML = breakLength;
  document.getElementById("session-length").innerHTML = sessionLength;
  document.getElementById("time-left").innerHTML = time;
  document.getElementById("start_stop").innerHTML = "Start";
}

function up_or_down(buttonID) {
  console.log("Pressed: " + buttonID);

  var parsedBreak = parseInt(breakLength);
  var parsedSession = parseInt(sessionLength);
  if (buttonID === "break-increment") {
    if (parsedBreak < 60) {
      parsedBreak++;
    }
  } else if (buttonID === "break-decrement") {
    if (parsedBreak > 1) {
      parsedBreak--;
    }
  } else if (buttonID === "session-increment") {
    if (parsedSession < 60) {
      parsedSession++;
    }
  } else if (buttonID === "session-decrement") {
    if (parsedSession > 1) {
      parsedSession--;
    }
  }
  sessionLength = parsedSession.toString();
  document.getElementById("session-length").innerHTML = sessionLength;
  breakLength = parsedBreak.toString();
  document.getElementById("break-length").innerHTML = breakLength;
  time = parsedSession.toString() + ":00";
  if (parsedSession < 10) {
    time = "0" + time;
  }
  document.getElementById("time-left").innerHTML = time;
}
