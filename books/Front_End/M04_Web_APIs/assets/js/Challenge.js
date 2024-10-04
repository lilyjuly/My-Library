// Get references to all necessary DOM elements
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const submitScoreButton = document.getElementById('submit-score-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const highScoresScreen = document.getElementById('high-scores');
const timerElement = document.getElementById('timer');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const scoreList = document.getElementById('score-list');

let shuffledQuestions, currentQuestionIndex;
let timeLeft;
let timer;
let score;

// Event listeners for start, restart and submit buttons
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
submitScoreButton.addEventListener('click', saveScore);

// Questions array
const questions = [
    {
        question: "မြန်မာနိုင်ငံ လွတ်လပ်ရေးရသောခုနှစ်?",
        answers: [
            { text: "1945", correct: false },
            { text: "1947", correct: false },
            { text: "1948", correct: true },
        ]
    },
    {
        question: "ဗိုလ်ချုပ်အောင်ဆန်း၏ ငယ်နာမည်?",
        answers: [
            { text: "ထိန်ဝင်း", correct: false },
            { text: "ထိန်လင်း", correct: true },
            { text: "အောင်ဆန်း", correct: false },
        ]
    },
    {
        question: "ဂေါတမဘုရားလောင်း တောထွက်တော်မူသောနေ့?",
        answers: [
            { text: "တနင်္လာ", correct: true },
            { text: "အင်္ဂါ", correct: false },
            { text: "စနေ", correct: false }
        ]
    },
    {
        question: "အင်္ဂလန်ပရီးမီးယားလိဂ်တွင် ရွှေဖလားရဖူးသောအသင်း?",
        answers: [
            { text: "စပါး", correct: false },
            { text: "လီဗာပူး", correct: false },
            { text: "အာဆင်နယ်", correct: true },
            { text: "မန်ယူ", correct: false }
        ]
    },
    {
        question: "ဒေါ်အောင်ဆန်းစုကြည် မွေးဖွားသောခုနှစ်?",
        answers: [
            { text: "1945", correct: true },
            { text: "1944", correct: false },
            { text: "1943", correct: false },
            { text: "1946", correct: false }
        ]
    },
    {
        question: "ဗြဟ္မစိုရ်တရား အရေအတွက်?",
        answers: [
            { text: "၈ပါး", correct: false },
            { text: "၅ပါး", correct: false },
            { text: "၄ပါး", correct: true },
            { text: "၃ပါး", correct: false }
        ]
    },
   
   
    
];

// Function to start the game
function startGame() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    timerElement.textContent = `Time: ${timeLeft}`;
    timer = setInterval(updateTime, 1000);
    setNextQuestion();
}

// Function to update the timer
function updateTime() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        endGame();
    }
}

// Function to set the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Function to display the question
function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Function to reset the state for the next question
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreElement.textContent = timeLeft;
}

// Function to save the score
function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { score: timeLeft, initials: initials };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        showHighScores();
    }
}

// Function to display high scores
function showHighScores() {
    endScreen.classList.add('hidden');
    highScoresScreen.classList.remove('hidden');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    scoreList.innerHTML = highScores.map(score => {
        return `<li>${score.initials} - ${score.score}</li>`;
    }).join('');
}

// Function to restart the game
function restartGame() {
    highScoresScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}