import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const input = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      btnStart.setAttribute('disabled', true);
      // alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(input, options);

btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', onClick);

function onClick() {
  const intervalId = setInterval(() => {
    const deltaTime = calculeteDeltaTime();
    if (deltaTime > 0) {
      const timeInterval = convertMs(deltaTime);

      addLeadingZero(timeInterval);
    } else {
      return;
    }

    // clearInterval(timerId);
  }, 1000);
  if (Date.now() === fp.selectedDates[0]) {
    clearInterval(intervalId);
  }
}

function calculeteDeltaTime() {
  const selectetDate = fp.selectedDates[0];
  const currentTime = Date.now();
  const startTime = selectetDate.getTime();
  const deltaTime = startTime - currentTime;
  console.log(deltaTime);

  return deltaTime;
}

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

function addLeadingZero(date) {
  days.innerHTML = String(date.days).padStart(2, '0');
  hours.innerHTML = String(date.hours).padStart(2, '0');
  minutes.innerHTML = String(date.minutes).padStart(2, '0');
  seconds.innerHTML = String(date.seconds).padStart(2, '0');
}
