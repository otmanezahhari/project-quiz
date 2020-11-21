//Get Dom Element
const question = document.getElementById('question');
const choices = document.querySelectorAll('.choice-text');
const questionNumber = document.querySelector('#question-number span');
const playerName = document.querySelector('#player-name span');
const gameScore = document.querySelector('#game-score span');

playerName.innerHTML = localStorage.getItem("name");
//All Variable
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
fetch('./question.json').then(res=>{
  return res.json();
}).then( data=> {
  
  questions = data;
  startGame();
}).catch(err => {
  console.log(err);
});
//CONSTANTS
const MAX_QUESTIONS = 3;




//Function Start Game
startGame = () => {
  //Restart Counter & Score
  questionNumber.innerHTML = questionCounter = 0;
  gameScore.innerHTML = score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
}

//Function getNewQuestion
getNewQuestion=()=>{

if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
  //go to the end page
  return window.location.assign('./end.html');
}

  //Update Counter Number
  questionNumber.innerHTML =`${++questionCounter }/${MAX_QUESTIONS}`;

  //Get Random Index
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);

  //Get Random Object
  currentQuestion = availableQuesions[questionIndex];

  //Get Question From Random Object
  question.innerText = currentQuestion.question;

  // Get Choice From RAndom object
  choices.forEach((choice) => {   
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
});
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//AddEvent Listner
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const classToAdd =  selectedChoice.innerText === currentQuestion[`choice${currentQuestion.answer}`] ? 'goodAnswer' : 'notGood'; 
      selectedChoice.parentElement.classList.add(classToAdd);
      classToAdd === 'goodAnswer'?  gameScore.innerHTML =`${++score }/${MAX_QUESTIONS}`:'';
      localStorage.setItem('gameScore',((score/MAX_QUESTIONS).toPrecision(2))*100);
      setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToAdd);
        getNewQuestion();
      },1200);
      
      
  });
});
