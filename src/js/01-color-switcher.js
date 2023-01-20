const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const changeBg = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onStart);

function onStart(evt) {
  timerId = setInterval(() => {
    changeBg.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}
btnStop.addEventListener('click', onStopt);

function onStopt(evt) {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
