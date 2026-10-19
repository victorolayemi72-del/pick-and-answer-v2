// Pick & Answer V2.0 — Game Engine

let currentQuestion = null;
let usedQuestions = [];
let currentCategory = "All";
let playerTurn = 1;

// Select a random question
function getRandomQuestion() {
    let availableQuestions = questions.filter(question => {
        const categoryMatches =
            currentCategory === "All" ||
            question.category === currentCategory;

        const notUsed = !usedQuestions.includes(question.id);

        return categoryMatches && notUsed;
    });

    // Restart the question cycle when all matching questions are used
    if (availableQuestions.length === 0) {
        usedQuestions = [];

        availableQuestions = questions.filter(question =>
            currentCategory === "All" ||
            question.category === currentCategory
        );
    }

    if (availableQuestions.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * availableQuestions.length
    );

    const question = availableQuestions[randomIndex];

    usedQuestions.push(question.id);

    return question;
}

// Display a new question
function nextQuestion() {
    const question = getRandomQuestion();

    if (!question) {
        alert("No questions available in this category.");
        return;
    }

    currentQuestion = question;

    document.getElementById("questionText").textContent =
        question.text;

    document.getElementById("questionCategory").textContent =
        question.category;

    document.getElementById("turnIndicator").textContent =
        "Player " + playerTurn + "'s turn";

    document.getElementById("gameCard").hidden = false;
}

// Switch between players
function switchTurn() {
    playerTurn = playerTurn === 1 ? 2 : 1;

    nextQuestion();
}

// Change question category
function changeCategory(category) {
    currentCategory = category;
    usedQuestions = [];

    nextQuestion();
}

// Start a local game
function startGame() {
    document.getElementById("setupCard").hidden = true;
    document.getElementById("gameCard").hidden = false;

    nextQuestion();
}

// Show the next question when a player skips or finishes answering
function skipQuestion() {
    switchTurn();
          }
