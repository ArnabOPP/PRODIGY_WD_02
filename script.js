// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formatted =
    `${hh.toString().padStart(2, '0')}:` +
    `${mm.toString().padStart(2, '0')}:` +
    `${ss.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(2, '0')}`;

  return formatted;
}

function startPause() {
  const startBtn = document.getElementById("start-btn");

  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      const [main, ms] = timeToString(elapsedTime).split('.');
      document.getElementById('time-main').textContent = main;
      document.getElementById('time-ms').textContent = '.' + ms;
    }, 10);
    isRunning = true;
    startBtn.textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "Start";
  }
}


function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;

  document.getElementById('time-main').textContent = "00:00:00";
  document.getElementById('time-ms').textContent = ".00";
  document.getElementById('start-btn').textContent = "Start";
  document.getElementById('laps').innerHTML = "";

  // 🔄 Animate the icon only
  const resetIcon = document.getElementById('reset-icon');
  resetIcon.classList.add('spin-animation');

  // Remove class so it can be re-added on next click
  setTimeout(() => {
    resetIcon.classList.remove('spin-animation');
  }, 600); // Match duration of animation
}




function lap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = timeToString(elapsedTime);
    laps.appendChild(li);
  }
}

function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    function toggleSettings() {
      const panel = document.getElementById('settings-panel');
      panel.classList.toggle('open');
    }

    function changeBackground(image) {
      document.body.style.backgroundImage = `url('${image}')`;
      document.getElementById('settings-panel').classList.remove('open');
    }

    // Close panel when clicking outside it
    document.addEventListener('click', function (event) {
      const panel = document.getElementById('settings-panel');
      const settingsButton = document.querySelector('.controls button:last-child');
      if (panel.classList.contains('open') && !panel.contains(event.target) && event.target !== settingsButton) {
        panel.classList.remove('open');
      }
       });
    
    const quotes = [
      "PRODIGY_WD_02",
      "STOP WATCH",
      "Web Application"
    ];

    let currentQuote = 0;
    let charIndex = 0;
    const speed = 100; // typing speed in ms
    const delayBetweenQuotes = 2500;
    const quoteElement = document.getElementById("quote");

    function typeQuote() {
      const currentText = quotes[currentQuote];
      if (charIndex < currentText.length) {
        quoteElement.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeQuote, speed);
      } else {
        setTimeout(eraseQuote, delayBetweenQuotes);
      }
    }

    function eraseQuote() {
      if (charIndex > 0) {
        quoteElement.textContent = quoteElement.textContent.slice(0, -1);
        charIndex--;
        setTimeout(eraseQuote, speed / 2);
      } else {
        currentQuote = (currentQuote + 1) % quotes.length;
        setTimeout(typeQuote, speed);
      }
    }

    typeQuote(); // Start the typing effect