const elements = {
    hr: document.getElementById("hr"),
    min: document.getElementById("min"),
    sec: document.getElementById("sec"),
    startPauseButton: document.getElementById("startPauseButton"),
    resetButton: document.getElementById("resetButton")
};

const MAX_SECONDS = 59;
const MAX_MINUTES = 59;
let intervalId = false;

const addEventListener = (element, event, handler) => element.addEventListener(event, handler);

const toggleStartPause = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        elements.startPauseButton.textContent = 'Start';
    } else {
        intervalId = setInterval(timer, 1000);
        elements.startPauseButton.textContent = 'Pause';
    }
};

const resetTimer = () => {
    clearInterval(intervalId);
    elements.hr.value = elements.min.value = elements.sec.value = 0;
    elements.sec.value = formatTime(elements.sec.value);
    elements.min.value = formatTime(elements.min.value);
    elements.hr.value = formatTime(elements.hr.value);
    elements.startPauseButton.textContent = 'Start';
};

const formatTime = value => value.toString().padStart(2, '0');

const timer = () => {
    let seconds = parseInt(elements.sec.value, 10),
        minutes = parseInt(elements.min.value, 10),
        hours = parseInt(elements.hr.value, 10);

    if (seconds > 0) {
        elements.sec.value = seconds - 1;
    } else if (minutes > 0) {
        elements.sec.value = MAX_SECONDS;
        elements.min.value = minutes - 1;
    } else if (hours > 0) {
        elements.sec.value = MAX_SECONDS;
        elements.min.value = MAX_MINUTES;
        elements.hr.value = hours - 1;
    } else {
        resetTimer();
        alert("Times UP!");
    }

    elements.sec.value = formatTime(elements.sec.value);
    elements.min.value = formatTime(elements.min.value);
    elements.hr.value = formatTime(elements.hr.value);
};

addEventListener(elements.startPauseButton, "click", toggleStartPause);
addEventListener(elements.resetButton, "click", resetTimer);
