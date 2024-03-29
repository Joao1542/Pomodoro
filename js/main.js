// Global variables 
  var workClicks = 25;
  var breakClicks = 5; 
  var workDisplay = document.getElementById('work-display');
  var breakDisplay = document.getElementById('break-display');
  var count = 0;
  var workSession;
  var breakSession;

  /*------------------------ Work time -------------------------------*/
  // increase work time
  var increaseWork = document.getElementById('addWorkButton');
  increaseWork.addEventListener("click", function() {
    workClicks += 1;
    workDisplay.innerHTML = workClicks;
  }, false);

  // decrease work time
  var decreaseWork = document.getElementById('minusWorkButton');
  decreaseWork.addEventListener("click", function() {
    workClicks -= 1;
    workDisplay.innerHTML = workClicks;
  }, false);

  /*------------------------ Break time ------------------------------*/
  // increase break time
  var increaseBreak = document.getElementById('addBreakButton');
  increaseBreak.addEventListener('click', function () {
    breakClicks += 1
    breakDisplay.innerHTML = breakClicks;
  }, false);

  //decrease break time
  var decreaseBreak = document.getElementById('minusBreakButton');
  decreaseBreak.addEventListener('click', function () {
    breakClicks -= 1
    breakDisplay.innerHTML = breakClicks;
  }, false);

  /*----------------------- Start work time ------------------------- */
  function start() {
    count = workClicks * 60; // converting to seconds
    workSession = setInterval (workCountDown, 1000);
  }
  function workCountDown() {
    var seconds = count;
    var hours = Math.floor(seconds/3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds/60);
    seconds -= minutes*60;
    document.getElementById('showTime').innerHTML = ('00' + hours).slice(-2) + ":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);   
    count--;
    if ( count < 0) {
      clearInterval(workSession);
      workSession = null;
      document.getElementById('showTime').innerHTML = 'Começando intervalo';
      var breakDelay = setTimeout(function() {
        startBreak();
      }, 3000);
    }
  }
/*------------------------- Start break time -------------------------- */
  function startBreak() {
    count = breakClicks * 60; // converting to seconds
    document.getElementById('pause').disabled = true;
    document.getElementById('resume').disabled = true;
    breakSession = setInterval (breakCountDown, 1000);
  }
  function breakCountDown() {
    document.getElementById('timer-panel').style.backgroundColor = "#9BC9D6";
    var seconds = count;
    var hours = Math.floor(seconds/3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds/60);
    seconds -= minutes*60;
    document.getElementById('showTime').innerHTML = ('00' + hours).slice(-2) + ":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);   
    count--;
    if ( count < 0) {
      clearInterval(breakSession);
      breakSession = null;
      document.getElementById('showTime').innerHTML = 'Parabéns! Você concluiu um período com o pomodoro!';
      setTimeout(function() {
        reset();
      }, 3000);
    }

    
  }

/*---------------------- Pause function------------------------------- */
function pause() {
  clearInterval(workSession);
  clearInterval(breakSession)
  workSession = null;
  breakSession = null;
}

/*---------------------- Resume function------------------------------- */
function resume() {
  workSession = setInterval(workCountDown, 1000);
}

/*---------------------- Reset function------------------------------- */
function reset() {
  if(workSession) {
    clearInterval(workSession);
    workSession = null;
  } else {
    clearInterval(breakSession);
    breakSession = null;
  }

  document.getElementById('showTime').innerHTML = '';
  document.getElementById('timer-panel').style.backgroundColor = '#FC5D66';
  document.getElementById('pause').disabled = false;
  document.getElementById('resume').disabled = false;
} 