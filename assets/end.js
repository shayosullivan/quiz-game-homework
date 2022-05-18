const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = document.getElementById("username");

const highScores = JSON.parse(localStorage.getItem("highScores"));
