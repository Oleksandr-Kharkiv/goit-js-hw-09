function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;
let isActiveColorChange = false;

btnStartEl.addEventListener('click', () => {
  if (isActiveColorChange) {
    return;
  }
  isActiveColorChange = true;
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    console.log('Поточний колір фону:', bodyEl.style.backgroundColor);
    console.log('Ідентифікатор інтервалу:', intervalId);
  }, 1000);
  console.log('Функція зміни кольору ввімкнена:', isActiveColorChange);
});

btnStopEl.addEventListener('click', () => {
  if (!isActiveColorChange) {
    return;
  }
  clearInterval(intervalId);
  isActiveColorChange = false;
  console.warn('Функція зміни кольору ввімкнена:', isActiveColorChange);
});
