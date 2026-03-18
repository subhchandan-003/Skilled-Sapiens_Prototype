// Skilled Sapiens - Quiz Module

// Quiz State
let quizState = {
    currentQuestion: 0,
    answers: [],
    score: 0,
    timeRemaining: 0,
    isSubmitted: false
};

// Start Quiz
function startQuiz(quizId) {
    const quiz = quizQuestions; // Using sample questions

    quizState = {
        currentQuestion: 0,
        answers: new Array(quiz.length).fill(null),
        score: 0,
        timeRemaining: quiz.length * 60 * 2, // 2 minutes per question
        isSubmitted: false,
        questions: quiz
    };

    showPage('quiz');
    renderQuestion();
    startTimer();
}

// Render Question
function renderQuestion() {
    const quiz = quizState.questions;
    const question = quiz[quizState.currentQuestion];

    document.getElementById('quizTitle').textContent = 'Quiz';
    document.getElementById('currentQuestion').textContent = quizState.currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = quiz.length;
    document.getElementById('quizProgressFill').style.width =
        ((quizState.currentQuestion + 1) / quiz.length * 100) + '%';

    const content = document.getElementById('quizContent');
    content.innerHTML = `
        <div class="quiz-question">
            <div class="question-number">Question ${quizState.currentQuestion + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <div class="option ${quizState.answers[quizState.currentQuestion] === index ? 'selected' : ''}" 
                         onclick="selectOption(${index})">
                        <div class="option-marker">${String.fromCharCode(65 + index)}</div>
                        <div class="option-text">${option}</div>
                        <div class="option-feedback">
                            <i class="fas ${quizState.answers[quizState.currentQuestion] === index ?
            (index === question.correct ? 'fa-check' : 'fa-times') : ''}"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update navigation buttons
    document.getElementById('prevQuestionBtn').disabled = quizState.currentQuestion === 0;
    document.getElementById('nextQuestionBtn').textContent =
        quizState.currentQuestion === quiz.length - 1 ? 'Submit' : 'Next';
}

// Select Option
function selectOption(optionIndex) {
    if (quizState.isSubmitted) return;

    quizState.answers[quizState.currentQuestion] = optionIndex;
    renderQuestion();
}

// Previous Question
function prevQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        renderQuestion();
    }
}

// Next Question
function nextQuestion() {
    const quiz = quizState.questions;

    if (quizState.currentQuestion < quiz.length - 1) {
        quizState.currentQuestion++;
        renderQuestion();
    } else {
        // Submit quiz
        submitQuiz();
    }
}

// Submit Quiz
function submitQuiz() {
    quizState.isSubmitted = true;

    // Calculate score
    let correct = 0;
    quizState.questions.forEach((q, i) => {
        if (quizState.answers[i] === q.correct) {
            correct++;
        }
    });

    quizState.score = Math.round((correct / quizState.questions.length) * 100);

    // Show results
    showResults();
}

// Show Results
function showResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';

    document.getElementById('scoreNumber').textContent = quizState.score;
    document.getElementById('scoreTotal').textContent = quizState.questions.length;

    const resultsIcon = document.getElementById('resultsIcon');
    const resultsMessage = document.getElementById('resultsMessage');

    if (quizState.score >= 70) {
        resultsIcon.className = 'results-icon';
        resultsMessage.textContent = 'Great job! You passed the quiz!';
    } else {
        resultsIcon.className = 'results-icon failed';
        resultsMessage.textContent = 'Keep practicing! You need 70% to pass.';
    }
}

// Retake Quiz
function retakeQuiz() {
    document.querySelector('.quiz-container').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    startQuiz(1);
}

// Continue Course
function continueCourse() {
    showPage('my-learning');
}

// Start Timer
function startTimer() {
    const timerInterval = setInterval(() => {
        if (quizState.isSubmitted || !document.getElementById('quizPage').classList.contains('active')) {
            clearInterval(timerInterval);
            return;
        }

        quizState.timeRemaining--;

        const minutes = Math.floor(quizState.timeRemaining / 60);
        const seconds = quizState.timeRemaining % 60;

        // Update timer display if exists
        const timerEl = document.querySelector('.quiz-timer');
        if (timerEl) {
            timerEl.querySelector('span').textContent =
                `${minutes}:${seconds.toString().padStart(2, '0')}`;

            if (quizState.timeRemaining < 60) {
                timerEl.classList.add('danger');
            } else if (quizState.timeRemaining < 300) {
                timerEl.classList.add('warning');
            }
        }

        if (quizState.timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Skip to Question
function skipToQuestion(questionIndex) {
    quizState.currentQuestion = questionIndex;
    renderQuestion();
}

// Flag Question
function flagQuestion() {
    // Implementation for flagging questions
    showToast('Question flagged for review', 'info');
}
