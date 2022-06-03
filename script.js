// Global Variables

// Name of player 
let user_name; 

// Score
let score = 0;

// Timer 
var timeLeft = 60;

// current question
var currQuestionIndex = 0;

// Questions
const questions = [
    {
        question: " Question 1: The condition in an If/Else statement is enclosed within __ ", correctResponse: 1, options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"], selectedAnswer: null
    },
    {
        question: "Arrays in JavaScript can be used to store __.", correctResponse: 3, options: ["Numbers and Strings", "Other Arrays", "Boolenas", "All of the Above"], selectedAnswer: null 
    },
    {
        question: "String Values must be enclosed within __ when being assigned to variables.", correctResponse: 1, options: ["Commas", "Curly Brackets", "Qoutes", "Parenthesis"], selectedAnswer: null
    },
    {
        question: "A very useful tool used during the development and debugging for printing content to the debugger is?", correctResponse: 1, options: ["for loops", "Console.log", "Terminal/Bash", "Javascript"], selectedAnswer: null
    }
] 

// Start game
  function init(){
    console.log("Starting game"); 
    startTimer();
    unhideQuestions();
    promptName();
    displayNextQuestion();
}

function promptName(){
    user_name = prompt("What is your name?");
}

function unhideQuestions(){
    var question_block = document.getElementById("question-block");
    question_block.classList.remove("hide");
}

function startTimer(){
    var timeInterval = setInterval(function () {
        isGameOver();
        timeLeft--;
        updateElement("timer", "time left:" + timeLeft);
         if (timeLeft == 0){
             // Time is up
            clearInterval(timeInterval);
        }
    }, 1000);
    
};

function isGameOver(){
    console.log('Game over');
    console.log('timeLeft ' + timeLeft);
    if(timeLeft <= 0 || currQuestionIndex === questions.length){
        alert("Game Over!");
        
        timeLeft = 60;
        currQuestionIndex = 0;
    
        saveScore();
        init();
    } 
}

function saveScore(){
    var scoresArr = JSON.parse(localStorage.getItem("scores"));
    console.log("got scoresArr: " + scoresArr);
    if(scoresArr && scoresArr.length >= 0){
        scoresArr.push(score);    
    } else {
        scoresArr = []
        scoresArr.push(score);    
    }
    console.log("saving scoresArr: " + scoresArr);
    localStorage.setItem("scores", JSON.stringify(scoresArr));
}

function updateElement(name, value){
    const element = document.getElementById(name);
    element.innerHTML = value;
}

function displayNextQuestion(){
    displayQuestion();
    displayOptions();
    clearRadioButtons();
}

function clearRadioButtons(){
    var radios = document.getElementsByName('choice');
    for (var i = 0, length = radios.length; i < length; i++) {
        radios[i].checked = false;
    }
}

function displayQuestion(){
    updateElement("top-text", questions[currQuestionIndex].question);
}

function displayOptions(){
    var options = questions[currQuestionIndex].options;
    for(var i = 0; i < options.length; i++){
        var idText = "option-" + i + "-label";
        var labelElement = document.getElementById(idText);
        var option = options[i];
        labelElement.innerHTML = option;
    }
}

function submitAnswer() {
    var radios = document.getElementsByName('choice');
    var val= "";
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
           val = radios[i].value; 
           // vall is the selected response
           break;
         }
    }
    
    var isCorrect = false;
    var corrAnswer = questions[currQuestionIndex].correctResponse;

    if (val == "" ) {
      alert('please select choice answer');
    } else if ( val == "option-0" ) {
      if(corrAnswer === 0) 
        isCorrect = true;
    } else if(val == "option-1"){
        if(corrAnswer === 1) 
            isCorrect = true;
    } else if(val == "option-2"){
        if(corrAnswer === 2) 
            isCorrect = true;
    } else if(val == "option-3"){
        if(corrAnswer === 3) 
            isCorrect = true;
    } 
    
    handleReponse(isCorrect);
    displayNextQuestion();
}


function handleReponse(correctResponse){
    currQuestionIndex++;
    if(!correctResponse){
        alert("Sorry, that was wrong...deducting 10 seconds from the clock.")
        // Deduct time from the timer
        timeLeft -= 10;
    } else {
        alert("You got it!")
        score += 10;
    }
}

