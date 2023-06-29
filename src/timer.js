export default class {
  #element;
  #secondsEl;
  #minutesEl;
  #hoursEl;
  #daysEl;
  #intervalId;

  constructor(elementSelector, options) {
    this.#element = document.querySelector(elementSelector);
    // console.log(this.#element);

    this.options = options;
    // console.log(this.options);

    this.initMarkup();
    // console.log(this.#element);

    this.getTimerElement();
    // this.start();
  }

  initMarkup() {
    const TEMPLATE = `<h2 class="timer-label">${this.options.label}</h2>
    <div class="timer">
      <div class="timer-part">
        <div class="timer-value timer-value_days">00</div>
        <div class="timer-desc">Days</div>
      </div>
      <div class="timer-part">
        <div class="timer-value timer-value_hours">00</div>
        <div class="timer-desc">Hours</div>
      </div>
      <div class="timer-part">
        <div class="timer-value timer-value_minutes">00</div>
        <div class="timer-desc">Minutes</div>
      </div>
      <div class="timer-part">
        <div class="timer-value timer-value_seconds">00</div>
        <div class="timer-desc">Seconds</div>
      </div>
    </div>`;

    this.#element.insertAdjacentHTML('afterbegin', TEMPLATE);
  }

  getTimerElement() {
    this.#secondsEl = this.#element.querySelector('.timer-value_seconds');
    this.#minutesEl = this.#element.querySelector('.timer-value_minutes');
    this.#hoursEl = this.#element.querySelector('.timer-value_hours');
    this.#daysEl = this.#element.querySelector('.timer-value_days');
  }

  update() {
    const now = Date.now();
    const targetDate = this.options.target.getTime();

    const neededTime = targetDate - now;

    let { days, hours, minutes, seconds } = this.convertMiliseconds(neededTime);

    this.#secondsEl.textContent = seconds;
    this.#minutesEl.textContent = minutes;
    this.#hoursEl.textContent = hours;
    this.#daysEl.textContent = days;
  }

  start() {
    this.update();
    this.#intervalId = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  convertMiliseconds(miliseconds) {
    let days,
      hours,
      minutes,
      seconds,
      total_hours,
      total_minutes,
      total_seconds;

    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = String(parseInt(Math.floor(total_hours / 24))).padStart(2, '0');
    seconds = String(parseInt(total_seconds % 60)).padStart(2, '0');
    minutes = String(parseInt(total_minutes % 60)).padStart(2, '0');
    hours = String(parseInt(total_hours % 24)).padStart(2, '0');

    return { days, hours, minutes, seconds };
  }
}
