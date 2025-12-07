let currentQuestion = 0;
let score = 0;
let username = "";

const questions = [
    {
        question: "Which data structure uses FIFO (First In First Out)?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correct: 1
    },
    {
        question: "Which data structure uses LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1
    },
    {
        question: "Which of the following is a linear data structure?",
        options: ["Tree", "Graph", "Array", "Heap"],
        correct: 2
    },
    {
        question: "Which data structure is used to implement recursion?",
        options: ["Queue", "Graph", "Stack", "Tree"],
        correct: 2
    },
    {
        question: "Which data structure is best for fast searching?",
        options: ["Linked List", "Binary Search Tree", "Queue", "Stack"],
        correct: 1
    },
    {
        question: "Which data structure allows insertion and deletion at both ends?",
        options: ["Array", "Deque", "Queue", "Tree"],
        correct: 1
    },
    {
        question: "Which traversal is used in BFS (Breadth First Search)?",
        options: ["Stack", "Queue", "Tree", "Heap"],
        correct: 1
    },
    {
        question: "Which traversal is used in DFS (Depth First Search)?",
        options: ["Stack", "Queue", "Binary Tree", "Heap"],
        correct: 0
    },
    {
        question: "Which of the following is NOT a type of linked list?",
        options: ["Singly", "Doubly", "Circular", "Parallel"],
        correct: 3
    },
    {
        question: "Which structure is used to represent hierarchical data?",
        options: ["Array", "Stack", "Tree", "Queue"],
        correct: 2
    }
];

function startQuiz() {
    username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");

    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const correct = questions[currentQuestion].correct;

    if (selected === correct) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
    }

    disableOptions();
}

function disableOptions() {
    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    loadQuestion();
}

function showResult() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("score").innerText = score;
}

function saveScore() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: username, score: score });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("leaderboard-screen").classList.remove("hidden");

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const list = document.getElementById("leaderboard-list");

    list.innerHTML = "";

    leaderboard.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.score}`;
        list.appendChild(li);
    });
}

function restartQuiz() {
    location.reload();
}

function goHome() {
    location.reload();
}
