import './sass/index.scss';
import Timer from './timer.js';

const newYearTimer = new Timer('#timer_1', {
  label: 'До нового року',
  target: new Date('2024-01-01'),
});

// window.test = newYearTimer;
// в консоль test.start() || test.options - всьо паше

const startBtn = document.querySelector('#startBtn');
const stoptBtn = document.querySelector('#stopBtn');

startBtn.addEventListener('click', onStartBtnClick);
stoptBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  newYearTimer.start();
  startBtn.disabled = true;
}

function onStopBtnClick(e) {
  newYearTimer.stop();
  startBtn.disabled = false;
}

new Timer('#timer_2', {
  label: 'До мого ДН',
  target: new Date('2023-08-20'),
});

new Timer('#timer_3', {
  label: 'До ДН Art',
  target: new Date('2024-03-23'),
});
