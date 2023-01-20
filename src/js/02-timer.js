import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      // dateCount = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};
flatpickr(dataInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  timerId = setInterval(() => {
    let interval = new Date(dataInput.value) - new Date();
    if (interval <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.info('Time is out!');
    } else {
      btnStart.disabled = true;
      const { days, hours, minutes, seconds } = convertMs(interval);
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}
