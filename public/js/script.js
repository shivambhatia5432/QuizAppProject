
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitButton=document.getElementById('submit-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const subjectContainer=document.getElementById('subject')
const scorecard=document.getElementById('score')
const FinalScore=document.getElementById('FinalScore')
const Timer=document.getElementById('Timer')
const TimerHeader=document.getElementById('TimerHeader')
const subject=subjectContainer.innerHTML;
var score=0,submitted=0;
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion()
})


function startGame() {
  var count = 600;
  score=0;
  scorecard.innerHTML=score;
  TimerHeader.innerHTML='Time Left is = ';
  Timer.innerHTML='';
  startButton.classList.add('hide')
  submitButton.classList.add('hide')
  TimerHeader.classList.remove('hide')
  Timer.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  var timer = setInterval(function() {
    Timer.innerHTML=Math.floor(count/60)+" Minutes "+Math.floor(count%60)+" seconds";
    count--;
    if(count === 0) {
      stopInterval();
      if(submitted===0){
        startButton.innerText = 'Restart'
        nextButton.classList.add('hide')
        answerButtonsElement.classList.add('hide')
        startButton.classList.remove('hide')
        submitButton.classList.remove('hide')
      }
    }
  }, 1000);

  var stopInterval = function() {
    Timer.classList.add('hide');
    TimerHeader.innerHTML='Time is up!You cannot Attend more Questions';
    clearInterval(timer);
  }

  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click',selectAnswer);
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  submitButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    submitted=1;
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    submitButton.classList.remove('hide')
  }

  if (selectedButton.dataset = correct) {
    score=score+20;
    }
    else{
      score=score-5;
    }

 scorecard.innerHTML=score;
 FinalScore.value=score;
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct') 
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


if(subject=="Random"){
questions = [
  {
    question: 'Who is creator of this quiz?',
    answers: [
      { text: 'Shivam Bhatia', correct: true },
      { text: 'Shivam Bhatia', correct: true },
      { text: 'Shivam Bhatia', correct: true },
      { text: 'Shivam Bhatia', correct: true }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Ashish Chanchlani', correct: false },
      { text: 'Pewdiepie', correct: false },
      { text: 'Logan Paul', correct: false },
      { text: 'Ankur Warikoo', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]
}

else if(subject=="Biology"){
  questions = [
    {
      question: 'Which of the following protects the body against infectious disease and foreign invaders?',
      answers: [
        { text: 'Leukocytes', correct: true },
        { text: 'Red blood cells', correct: false },
        { text: 'Endoplasmic reticulum (ER)', correct: false },
        { text: 'Golgi apparatus', correct: false }
      ]
    },
    {
      question: 'Hemoglobin in humans has the highest affinity for which of the following gases?',
      answers: [
        { text: 'Methane', correct: false },
        { text: 'Carbon Monoxide', correct: true },
        { text: 'Nitrous oxide', correct: false },
        { text: 'Carbon dioxide', correct: false }
      ]
    },
    {
      question: 'Which of the following is not a part of the digestive system?',
      answers: [
        { text: 'Small Intestine', correct: false },
        { text: 'Rectum', correct: false },
        { text: 'Pharynx', correct: false },
        { text: 'Spleen', correct: true }
      ]
    },
    {
      question: 'From which among the following parts of a plant Cinnamon is obtained?',
      answers: [
        { text: 'Leaves', correct: false },
        { text: 'Seeds', correct: false },
        { text: 'Bark', correct: true },
        { text: 'Buds', correct: false }
      ]
    },
    {
      question: 'Which among the following plants is used as Green Manure?',
      answers: [
        { text: 'Wheat', correct: false },
        { text: 'Sunhemp', correct: true },
        { text: 'Cotton', correct: false },
        { text: 'Rice', correct: false }
      ]
    }
  ]
  }

  else if(subject=="Physics"){
    questions = [
      {
        question: 'Who gave the Theory of Relativity',
        answers: [
          { text: 'Isaac Newton', correct: false },
          { text: 'Archimedes', correct: false },
          { text: 'Albert Einstein', correct: true },
          { text: 'Galileo Galilei', correct: false }
        ]
      },
      {
        question: 'Hemoglobin in humans has the',
        answers: [
          { text: 'Methane', correct: false },
          { text: 'Carbon Monoxide', correct: true },
          { text: 'Nitrous oxide', correct: false },
          { text: 'Carbon dioxide', correct: false }
        ]
      },
      {
        question: 'Who among the following is credited for the Corpuscular theory of light?',
        answers: [
          { text: 'Isaac Newton', correct: true },
          { text: 'Christiaan Hyugens', correct: false },
          { text: 'Albert Einstein', correct: false },
          { text: 'James Clerk Maxwell', correct: false }
        ]
      },
      {
        question: 'Who among the following discovered X-rays?',
        answers: [
          { text: 'Marie Curie', correct: false },
          { text: 'J.J Thomson', correct: false },
          { text: 'W.C Roentgen', correct: true },
          { text: 'James Chadwick', correct: false }
        ]
      },
      {
        question: 'Which of the following branch of Physics deal with study of Atomic Nuclei?',
        answers: [
          { text: 'Nuclear Physics', correct: true },
          { text: 'Bio Physics', correct: false },
          { text: 'Atomic Physics', correct: false },
          { text: 'None of the above', correct: false }
        ]
      }
    ]
    }

    else if(subject=="Tech"){
      questions = [
        {
          question: 'In which decade was the American Institute of Electrical Engineers (AIEE) founded?',
          answers: [
            { text: '1850s', correct: false },
            { text: '1880s', correct: true },
            { text: '1930s', correct: false },
            { text: '1950s', correct: false }
          ]
        },
        {
          question: 'What is part of a database that holds only one type of information?',
          answers: [
            { text: 'Report', correct: false },
            { text: 'Field', correct: true },
            { text: 'Record', correct: false },
            { text: 'File', correct: false }
          ]
        },
        {
          question: '"OS" computer abbreviation usually means ?',
          answers: [
            { text: 'Order of Significance', correct: false },
            { text: 'Open Software', correct: false },
            { text: 'Operating System', correct: true },
            { text: 'Optical Sensor', correct: false }
          ]
        },
        {
          question: '".MOV" extension refers usually to what kind of file?',
          answers: [
            { text: 'Image file', correct: false },
            { text: 'Animation/movie file', correct: true },
            { text: 'Audio file', correct: false },
            { text: 'MS Office document', correct: false }
          ]
        },
        {
          question: 'Which is a type of Electrically-Erasable Programmable Read-Only Memory?',
          answers: [
            { text: 'Flash', correct: true },
            { text: 'Flange', correct: false },
            { text: 'Fury', correct: false },
            { text: 'FRAM', correct: false }
          ]
        }
      ]
      }

      else if(subject=="History"){
        questions = [
          {
            question: 'The rulers of which dynasty were first to make land grants to Brahmanas?',
            answers: [
              { text: 'Maurya', correct: false },
              { text: 'Sunga', correct: false },
              { text: 'Satvahana', correct: true },
              { text: 'Kanvas', correct: false }
            ]
          },
          {
            question: 'First Buddhist Council was held during the reign of which of the following kings?',
            answers: [
              { text: 'Ajatsatru', correct: true },
              { text: 'Ashoka', correct: false },
              { text: 'Kanishka', correct: false },
              { text: 'Kalasoka', correct: false }
            ]
          },
          {          
            question: 'The University of Nalanda was set up by which Gupta ruler?',
            answers: [
              { text: 'Kumargupta I', correct: true },
              { text: 'Chandragupta II', correct: false },
              { text: 'Samudragupta', correct: false },
              { text: 'Kumargupta II', correct: false }
            ]
          },
          {          
            question: 'Who was the Syrian ambassador in the court of Bindusara?',
            answers: [
              { text: 'Megasthenes', correct: false },
              { text: 'Dimachos', correct: true },
              { text: 'Dionysius', correct: false },
              { text: 'Amitrochates', correct: false }
            ]
          },
          {
            question: 'The Kalinga war was fought in which year of Ashoka reign?',
            answers: [
              { text: '6', correct: false },
              { text: '7', correct: false },
              { text: '8', correct: true },
              { text: '9', correct: false }
            ]
          }
        ]
        }