const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const changeBg = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onStart);

function btnStanDisabled(x, y) {
  btnStart.disabled = x;
  btnStop.disabled = y;
}
function onStart(evt) {
  timerId = setInterval(() => {
    changeBg.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStanDisabled(true, false);
}

btnStop.addEventListener('click', onStopt);

function onStopt(evt) {
  clearInterval(timerId);
  btnStanDisabled(false, true);
}
