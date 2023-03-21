import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const calendarEl = document.querySelector('input#datetime-picker');
const timerEl = document.querySelector('.timer');
const colorBlockEl = timerEl.lastElementChild;
const btnStartEl = document.querySelector('button[data-start]');
btnStartEl.disabled = true;
let chosenTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.disabled = true;
    } else {
      btnStartEl.disabled = false;
      chosenTime = selectedDates[0];
    }
  },
};
flatpickr(calendarEl, options);

btnStartEl.addEventListener('click', timer);

function timer() {
  const intervalId = setInterval(() => {
    btnStartEl.disabled = true;
    const deltaTime = chosenTime - new Date();
    tablo(convertMs(deltaTime));
    colorBlockEl.style.backgroundColor = `${getRandomHexColor()}`;
    if (deltaTime <= 999) {
      Notiflix.Report.success('The end', 'Wait for new starts', '😉');
      clearInterval(intervalId);
      return
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function tablo({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }