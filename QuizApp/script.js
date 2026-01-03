const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Hyderabad", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: false },
            { text: "Tokyo", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

let quizEnded = false;

nextButton.addEventListener("click", () => {
    if (quizEnded) {
        quizEnded = false;
        startQuiz();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            quizEnded = true;
            showScore();
        }
    }
});

startQuiz();
