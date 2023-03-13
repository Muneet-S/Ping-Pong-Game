import "styles.css";

var firstRod = document.getElementById("first");
var secondRod = document.getElementById("second");
var ball = document.getElementById("ball");
var scoreNow = document.getElementById("score");
var left = 20;
var startGame = false;
var ballY = 48;
var ballX = 48;
var down;
var toLeft;
var toRight;
var up;
var score = 0;

localStorage.removeItem("name");
localStorage.removeItem("maxScore");

function reset() {
  ballX = 48;
  ballY = 48;
  ball.style.top = ballY + "%";
  ball.style.left = ballX + "%";
  score = 0;
  scoreNow.innerHTML = score;
  left = 20;
  firstRod.style.left = left * 2 + "%";
  secondRod.style.left = left * 2 + "%";
}

function moveLeft() {
  --left;
  if (left >= 0) {
    firstRod.style.left = left * 2 + "%";
    secondRod.style.left = left * 2 + "%";
  }
  if (left < 0) {
    left = 0;
  }
}

function moveRight() {
  ++left;
  if (left <= 41) {
    firstRod.style.left = left * 2 + "%";
    secondRod.style.left = left * 2 + "%";
  }
  if (left > 41) {
    left = 41;
  }
}
function moveBall() {
  moveHorizontally();
  moveVertically();
}

function moveBallDown() {
  var ballLeft = ball.offsetLeft;
  var ballW = ball.offsetWidth;
  ballY++;
  ball.style.top = ballY + "%";

  if (ball.offsetTop + ball.offsetHeight == secondRod.offsetTop - 2) {
    var rl = secondRod.offsetLeft - ballW;
    var rr = secondRod.offsetLeft + secondRod.offsetWidth;

    if (ballLeft <= rr && ballLeft >= rl) {
      score++;
      scoreNow.innerHTML = score;
      clearInterval(down);
      up = setInterval(moveBallUp, 45);
    } else {
      if (score > localStorage.getItem("maxScore")) {
        localStorage.setItem("name", "Rod 1");
        localStorage.setItem("maxScore", score);
        showNotification("new", " ", "highscore !!!");
      } else showNotification("you", " ", "missed");
      clearInterval(down);
      clearInterval(toLeft);
      clearInterval(toRight);
      reset();
    }
  }
}
function moveBallUp() {
  var ballLeft = ball.offsetLeft;
  --ballY;
  ball.style.top = ballY + "%";

  if (ball.offsetTop == firstRod.offsetTop + firstRod.offsetHeight + 3) {
    var rl = firstRod.offsetLeft - ball.offsetWidth;
    var rr = firstRod.offsetLeft + firstRod.offsetWidth;
    if (ballLeft <= rr && ballLeft >= rl) {
      score++;
      scoreNow.innerHTML = score;
      clearInterval(up);
      moveVertically();
    } else {
      if (score > localStorage.getItem("maxScore")) {
        localStorage.setItem("name", "Rod 2");
        localStorage.setItem("maxScore", score);
        showNotification("new", " ", "highscore !!!");
      } else showNotification("you", " ", "missed");
      clearInterval(up);
      clearInterval(toLeft);
      clearInterval(toRight);
      reset();
    }
  }
}
function moveVertically() {
  down = setInterval(moveBallDown, 45);
}
function moveBallLeft() {
  --ballX;
  ball.style.left = ballX + "%";
  if (ballX == 0) {
    clearInterval(toLeft);
    moveHorizontally();
  }
}
function moveBallRight() {
  ballX++;
  ball.style.left = ballX + "%";
  if (ballX == 98) {
    clearInterval(toRight);
    toLeft = setInterval(moveBallLeft, 45);
  }
}
function moveHorizontally() {
  toRight = setInterval(moveBallRight, 45);
}

function showNotification(text, text2, text3) {
  alert(text + text2 + text3);
}
function handleEvent(e) {
  var keynum = e.keyCode;
  if (keynum == 13) {
    startGame = true;
    reset();
    if (localStorage.getItem("maxScore") == undefined) {
      showNotification("this is your first", " ", "time");
    } else
      showNotification(
        localStorage.getItem("name"),
        " has a maximum score of ",
        localStorage.getItem("maxScore")
      );
    moveBall();
  }
  if (startGame == false) {
    showNotification("Please Press", " ", "Enter");
  }

  if (startGame == true) {
    if (keynum == 65) {
      moveLeft();
    } else if (keynum == 68) {
      moveRight();
    }
  }
}

document.addEventListener("keydown", handleEvent);