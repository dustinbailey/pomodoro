let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeSwitch = document.getElementById('mode-switch');

const WORK_TIME = 25 * 60;
const REST_TIME = 5 * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title when timer is running
    if (timerId !== null) {
        document.title = `(${timeString}) Pomodoro Timer 3000`;
    } else {
        document.title = 'Pomodoro Timer 3000';
    }
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : REST_TIME;
    statusText.textContent = isWorkTime ? 'Time to focus!' : 'Time for a break!';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
        startButton.textContent = 'Pause';
        startButton.classList.add('paused');
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        startButton.classList.remove('paused');
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = !modeSwitch.checked;
    timeLeft = isWorkTime ? WORK_TIME : REST_TIME;
    statusText.textContent = isWorkTime ? 'Time to work?' : 'Ready for a break?';
    startButton.textContent = 'Start';
    startButton.classList.remove('paused');
    startButton.disabled = false;
    updateDisplay();
}

startButton.addEventListener('click', function() {
    if (timerId === null) {
        if (isWorkTime) {
            statusText.textContent = "Focus time! You can do it! 💪";
        } else {
            statusText.textContent = "Time to recharge! 🌟";
        }
    }
    startTimer();
});
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 

modeSwitch.addEventListener('change', function() {
    // Clear any running timer
    clearInterval(timerId);
    timerId = null;
    
    // Reset button state
    startButton.textContent = 'Start';
    startButton.classList.remove('paused');
    
    if (this.checked) {
        // Rest mode
        timeLeft = REST_TIME;
        statusText.textContent = 'Ready for a break?';
        isWorkTime = false;
    } else {
        // Work mode
        timeLeft = WORK_TIME;
        statusText.textContent = 'Time to work?';
        isWorkTime = true;
    }
    
    // Update the display
    updateDisplay();
}); 