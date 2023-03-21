import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayNum = Number(delay.value);
  const stepNum = Number(step.value);
  const amountNum = Number(amount.value);

  for (let position = 1; position < amountNum + 1; position += 1) {
    createPromise(position, delayNum)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayNum += stepNum;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        console.log(`Проміс ${position} відпрацював`);
        resolve({ position, delay });
      } else {
        console.log(`Проміс ${position} провалився`);
        reject({ position, delay });
      }
    }, delay);
  });
}
