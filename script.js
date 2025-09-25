// Trivia Questions Database
const triviaQuestions = [
    {
        question: "What is the capital city of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who painted the famous artwork 'The Starry Night'?",
        answers: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "In which year did World War II end?",
        answers: ["1944", "1945", "1946", "1947"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which Shakespeare play features the characters Romeo and Juliet?",
        answers: ["Hamlet", "Macbeth", "Romeo and Juliet", "Othello"],
        correct: 2
    },
    {
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correct: 2
    },
    {
        question: "Which element has the atomic number 1?",
        answers: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        correct: 1
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correct: 1
    },
    {
        question: "Who wrote the novel '1984'?",
        answers: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "Ernest Hemingway"],
        correct: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        answers: ["China", "Japan", "Thailand", "South Korea"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "In Greek mythology, who is the king of the gods?",
        answers: ["Apollo", "Poseidon", "Hades", "Zeus"],
        correct: 3
    }
];

// Game State
let currentQuestionIndex = 0;
let score = 0;
let gameQuestions = [];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const playAgainBtn = document.getElementById('play-again-btn');

// Event Listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
playAgainBtn.addEventListener('click', resetGame);

// Add click event listeners to answer buttons
answerButtons.forEach(button => {
    button.addEventListener('click', selectAnswer);
});

// Game Functions
function startGame() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    
    // Shuffle questions and select 10
    gameQuestions = shuffleArray([...triviaQuestions]).slice(0, 10);
    
    // Switch to game screen
    showScreen(gameScreen);
    
    // Display first question
    displayQuestion();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function displayQuestion() {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    
    // Update game info
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of 10`;
    scoreElement.textContent = `Score: ${score}`;
    
    // Display question
    questionText.textContent = currentQuestion.question;
    
    // Display answers
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.className = 'answer-btn';
        button.disabled = false;
    });
    
    // Hide feedback
    feedback.classList.add('hidden');
}

function selectAnswer(event) {
    const selectedAnswer = parseInt(event.target.dataset.answer);
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct;
    
    // Disable all answer buttons
    answerButtons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
    
    // Show correct and incorrect answers
    answerButtons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('incorrect');
        }
    });
    
    // Update score and show feedback
    if (selectedAnswer === correctAnswer) {
        score++;
        feedbackText.textContent = "Correct! Well done! 🎉";
        feedbackText.style.color = "#28a745";
    } else {
        feedbackText.textContent = `Incorrect. The correct answer is: ${currentQuestion.answers[correctAnswer]}`;
        feedbackText.style.color = "#dc3545";
    }
    
    // Show feedback
    feedback.classList.remove('hidden');
    
    // Update score display
    scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < gameQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Calculate percentage
    const percentage = Math.round((score / 10) * 100);
    
    // Update final score
    finalScore.textContent = `Your Score: ${score}/10 (${percentage}%)`;
    
    // Show appropriate message based on score
    let message = "";
    if (percentage >= 90) {
        message = "Outstanding! You're a trivia master! 🏆";
        finalScore.style.color = "#28a745";
    } else if (percentage >= 80) {
        message = "Excellent work! You really know your stuff! 🌟";
        finalScore.style.color = "#28a745";
    } else if (percentage >= 70) {
        message = "Great job! You have solid general knowledge! 👍";
        finalScore.style.color = "#ffc107";
    } else if (percentage >= 60) {
        message = "Good effort! Keep learning and improving! 📚";
        finalScore.style.color = "#ffc107";
    } else if (percentage >= 50) {
        message = "Not bad! There's room for improvement! 💪";
        finalScore.style.color = "#fd7e14";
    } else {
        message = "Keep studying and try again! Practice makes perfect! 📖";
        finalScore.style.color = "#dc3545";
    }
    
    scoreMessage.textContent = message;
    
    // Switch to results screen
    showScreen(resultsScreen);
}

function resetGame() {
    // Reset all game state
    currentQuestionIndex = 0;
    score = 0;
    gameQuestions = [];
    
    // Reset answer buttons
    answerButtons.forEach(button => {
        button.className = 'answer-btn';
        button.disabled = false;
    });
    
    // Hide feedback
    feedback.classList.add('hidden');
    
    // Return to start screen
    showScreen(startScreen);
}

function showScreen(screen) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    // Show the specified screen
    screen.classList.add('active');
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    showScreen(startScreen);
});