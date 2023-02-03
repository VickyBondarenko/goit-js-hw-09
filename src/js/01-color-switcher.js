function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;
let timerId = null;
btnStop.setAttribute('disabled', true);

const changeColor = () => {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
};

btnStart.addEventListener('click', () => {
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', true);
  changeColor();
  timerId = setInterval(changeColor, 1000);
  console.log('start');
});

btnStop.addEventListener('click', () => {
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
  clearInterval(timerId);
  console.log('stop');
});
