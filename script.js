let container = document.getElementById("timers-container");
let addBtn = document.getElementById("add-timer-btn");
let sound = document.getElementById("alarm-sound");

addBtn.onclick = () => {
  let timerDiv = document.createElement("div");
  timerDiv.className = "timer-app";

  timerDiv.innerHTML = `
    <input class="name-input" placeholder="Tên timer">

    <div class="timer-display">00:00</div>

    <input class="time-input" type="number" placeholder="Nhập giây">

    <div class="buttons-container">
      <button class="start">Start</button>
      <button class="pause">Pause</button>
      <button class="reset">Reset</button>
      <button class="delete">X</button>
    </div>
  `;

  container.appendChild(timerDiv);

  let display = timerDiv.querySelector(".timer-display");
  let input = timerDiv.querySelector(".time-input");
  let startBtn = timerDiv.querySelector(".start");
  let pauseBtn = timerDiv.querySelector(".pause");
  let resetBtn = timerDiv.querySelector(".reset");
  let deleteBtn = timerDiv.querySelector(".delete");

  let time = 0;
  let interval = null;

  function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    display.textContent =
      String(min).padStart(2, "0") + ":" +
      String(sec).padStart(2, "0");
  }

  startBtn.onclick = () => {
    if (interval) return;

    if (time === 0) {
      time = parseInt(input.value) || 0;
    }

    interval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(interval);
        interval = null;

        // 🔊 phát âm thanh
        sound.currentTime = 0;
        sound.play();

        alert("⏰ Hết giờ!");
      }
    }, 1000);
  };

  pauseBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
  };

  resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    time = 0;
    updateDisplay();
  };

  deleteBtn.onclick = () => {
    clearInterval(interval);
    timerDiv.remove();
  };
};
