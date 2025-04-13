const commandEl = document.getElementById("command");
const timerEl = document.getElementById("timer");
const shapes = document.querySelectorAll(".shape");
const music = document.getElementById("bg-music");

let timer = 30;
let currentCommand = "";
let correctAction = "";

const commands = [
  "TAP! CIRCLE! NOW!",
  "SWIPE! LEFT! FAST!",
  "HOLD! SQUARE! QUICK!",
  "SWIPE! RIGHT! NOW",      // invalid
  "stop this",              // invalid
  "HELLO?",                 // invalid
  "SWIPE RIGHT FAST",       // invalid
  "TAP! TRIANGLE! NOW!"
];

function getNextCommand() {
  const cmd = commands[Math.floor(Math.random() * commands.length)];
  currentCommand = cmd;
  if (/^[A-Z! ]+$/.test(cmd) && cmd.includes("!") && cmd === cmd.toUpperCase()) {
    const match = cmd.match(/TAP! (\w+)!/);
    correctAction = match ? match[1] : null;
  } else {
    correctAction = null;
  }
  commandEl.textContent = cmd;
}

function updateTimer(change) {
  timer += change;
  if (timer < 0) timer = 0;
  timerEl.textContent = timer;
}

shapes.forEach(shape => {
  shape.addEventListener("click", () => {
    const shapeType = shape.dataset.shape;
    if (correctAction && shapeType === correctAction) {
      updateTimer(1);
    } else {
      updateTimer(-2);
      document.body.style.background = "red";
      setTimeout(() => document.body.style.background = "black", 100);
    }
    getNextCommand();
  });
});

setInterval(() => {
  if (timer > 0) {
    updateTimer(-1);
  } else {
    commandEl.textContent = "GAME OVER";
  }
}, 1000);

getNextCommand();
