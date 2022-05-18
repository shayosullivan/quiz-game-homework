const startButton = document.getElementById("start-btn");
const scoresButton = document.getElementById("high-scores");
const questionContainerElement = document.getElementById("question-container");
const timerEl = document.getElementById("countdown");
var timeInterval;

//start button/user interaction
startButton.addEventListener("click", startGame);
function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  scoresButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");

  var timeLeft = 20;
  timerEl.textContent = timeLeft + "seconds remaining";
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft + "seconds remaining";
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      showScores();
    }
  }, 1000);
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function populate() {
  if (quiz.isEnded()) {
    clearInterval(timeInterval);
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
  new Question("Anwser is 1", ["1", "2", "3", "4"], "1"),
  new Question("Anwser is 2", ["1", "2", "3", "4"], "2"),
  new Question("Anwser is 3", ["1", "2", "3", "4"], "3"),
  new Question("Anwser is 4", ["1", "2", "3", "4"], "4"),
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();
