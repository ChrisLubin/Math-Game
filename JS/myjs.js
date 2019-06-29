//Centers the game box
CenterContainer();

//Variable declarations
var option = [];
var correctIndex;
var score = 0;
var firstNumber;
var secondNumber;
var question;
var answer;
var answerBank = [];
var myCounter;
var endGameTimeout;
var status;
var playing = false;

Hide("endResults");

//Centers the game box
function CenterContainer() {
  var windowHeight = window.innerHeight;
  var container = document.getElementById("container");
  var containerHeight = getComputedStyle(container, null).getPropertyValue("height");
  containerHeight = containerHeight.split("px", 1);
  var containerPadding = getComputedStyle(container, null).getPropertyValue("padding");
  containerPadding = containerPadding.split("px", 1);
  container.style.margin = ((windowHeight - containerHeight - (containerPadding * 2)) / 2) + "px auto";
}

//Assigns the answer box divs to variables
function AssignAnswerBoxesToArray() {
  for (i = 0; i < 4; i++) {
    option[i] = document.getElementById("option" + (i + 1));
  }
}

function NewQuestion() {
  //Randomly assigns the question to two numbers between 1 and 10
  firstNumber = Math.round(Math.random() * 10);
  secondNumber = Math.round(Math.random() * 10);

  //Sets display to show question and stores the answer
  question = document.getElementById("display").innerHTML = "<p>" + firstNumber + "x" + secondNumber + "</p>";
  answer = firstNumber * secondNumber;
}

//Randomizes the answer options
function RandomizeAnswers(answer) {
  var random = 10;
  while (random >= 4) {
    random = Math.round(Math.random() * 10);
  }
  correctIndex = random;
  option[correctIndex].innerHTML = "<p>" + answer + "</p>";
  answerBank = [answer];
  for (i = 0; i < 4; i++) {
    var randomAnswer = Math.round(Math.random() * 10) * Math.round(Math.random() * 10);
    if (i != correctIndex) {
      while (answerBank.indexOf(randomAnswer) > -1) {
        randomAnswer = Math.round(Math.random() * 10) * Math.round(Math.random() * 10);
      }
      option[i].innerHTML = "<p>" + randomAnswer + "</p>";
      answerBank.push(randomAnswer);
    }
  }

}

//Checks user's answer and lets user know if the answer is correct or incorrect
function CheckAnswer(index) {
  if (document.getElementById("endResults").style.display == "none" && playing == true) {
    if (index == correctIndex) {
      score++;
      document.getElementById("score").innerHTML = "<p>Score : " + score + "</p>";
      Show("correct");
      Hide("wrong");
      clearTimeout(status);
      status = setTimeout(function() {
        Hide("correct");
      }, 1500);
      NewQuestion();
      RandomizeAnswers(answer);
    } else {
      Show("wrong");
      Hide("correct");
      clearTimeout(status);
      status = setTimeout(function() {
        Hide("wrong");
      }, 1500);
    }
  }
}

//Makes the counter div appear and starts counting down from 60 seconds
function Counter() {
  Show("counter");
  var counter = 60;
  document.getElementById("counter").innerHTML = "<p>Time Remaining : " + counter + "</p>";
  myCounter = setInterval(function() {
    counter--;
    document.getElementById("counter").innerHTML = "<p>Time Remaining : " + counter + "</p>";
  }, 1000);
  endGameTimeout = setTimeout(function() {
    Hide("counter");
    EndGame();
  }, 60500)
}

//Displays results and clears the answer boxes
function EndGame() {
  document.getElementById("endResults").innerHTML = "<p>GAME OVER!</p> <p>YOUR SCORE IS " + score + ".</p>";
  Show("endResults");
  for (i = 0; i < 4; i++) {
    option[i].innerHTML = "<p></p>";
  }
}

//If the user is playing, it resets the game and if the user is not playing, it starts the game
function ToggleGame() {
  if (playing == false) {
    playing = true;
    //Assigns the answer box divs to variables then randomizes answers
    AssignAnswerBoxesToArray();
    NewQuestion();
    RandomizeAnswers(answer);
    Counter();
    document.getElementById("togglegame").innerHTML = "<p>Reset Game</p>";
  } else {
    playing = false;
    score = 0;
    counter = 60;
    Hide("counter");
    Hide("correct");
    Hide("wrong");
    document.getElementById("togglegame").innerHTML = "<p>Start Game</p>";
    document.getElementById("display").innerHTML = "<p></p>";
    document.getElementById("score").innerHTML = "<p>Score : " + score + "</p>";
    Hide("endResults");
    clearTimeout(status);
    clearTimeout(endGameTimeout);
    clearInterval(myCounter);
    for (i = 0; i < 4; i++) {
      option[i].innerHTML = "<p></p>";
    }
  }
}

//Hides an element
function Hide(elementId) {
  document.getElementById(elementId).style.display = "none";
}

//Shows or unhides an element
function Show(elementId) {
  document.getElementById(elementId).style.display = "block";
}