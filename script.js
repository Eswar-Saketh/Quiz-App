const questionBank = [
  { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], correctAnswer: "Mitochondria" },
  { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: "Saturn" },
  { question: "In which year was the World Wide Web invented?", options: ["1985", "1991", "1989", "1993"], correctAnswer: "1989" },
  { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Core Processing Unit"], correctAnswer: "Central Processing Unit" },
  { question: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Linked List", "Binary Tree"], correctAnswer: "Stack" },
  { question: "What is the binary form of decimal 10?", options: ["1100", "1010", "1001", "1110"], correctAnswer: "1010" },
  { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correctAnswer: "Leonardo da Vinci" },
  { question: "Which language is called the 'mother of modern languages'?", options: ["FORTRAN", "COBOL", "Assembly", "C"], correctAnswer: "C" },
  { question: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correctAnswer: "O(log n)" },
  { question: "Which country built ENIAC, one of the first computers?", options: ["United Kingdom", "Germany", "Japan", "United States"], correctAnswer: "United States" },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
  { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Mercury"], correctAnswer: "Mars" },
  { question: "In which year did the first iPhone launch?", options: ["2005", "2006", "2007", "2008"], correctAnswer: "2007" },
  { question: "What is the main function of RAM?", options: ["Store permanent data", "Process graphics", "Temporarily hold data for the CPU", "Connect to the internet"], correctAnswer: "Temporarily hold data for the CPU" },
  { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Syntax", "Colorful Screen Styles", "Creative Style Specification"], correctAnswer: "Cascading Style Sheets" },
  { question: "Which data structure uses FIFO (First In, First Out)?", options: ["Stack", "Queue", "Hash Table", "Binary Tree"], correctAnswer: "Queue" },
  { question: "How many bytes are in one kilobyte (1 KB)?", options: ["512", "1000", "1024", "2048"], correctAnswer: "1024" },
  { question: "Who is known as the father of the computer?", options: ["Alan Turing", "Bill Gates", "Charles Babbage", "John von Neumann"], correctAnswer: "Charles Babbage" },
  { question: "What is the chemical symbol for water?", options: ["WO", "HO₂", "H₂O", "OH"], correctAnswer: "H₂O" },
  { question: "Which of these is NOT an operating system?", options: ["Linux", "Windows", "Python", "macOS"], correctAnswer: "Python" },
  { question: "What is the capital city of Japan?", options: ["Beijing", "Seoul", "Bangkok", "Tokyo"], correctAnswer: "Tokyo" },
  { question: "What does 'GUI' stand for?", options: ["General User Interface", "Graphical User Interface", "Global Unified Interface", "Graphics Under Input"], correctAnswer: "Graphical User Interface" },
  { question: "What is the value of π rounded to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correctAnswer: "3.14" },
  { question: "Which protocol is used to send emails?", options: ["FTP", "HTTP", "SMTP", "TCP"], correctAnswer: "SMTP" }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const nextBtnText = document.getElementById("next-btn-text");
const restartBtn = document.getElementById("restart-btn");
const countGrid = document.getElementById("count-grid");
const questionCounter = document.getElementById("question-counter");
const qTag = document.getElementById("q-tag");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedbackEl = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");
const timerBox = document.getElementById("timer-box");
const timerText = document.getElementById("timer-text");
const finalScoreEl = document.getElementById("final-score");
const scoreDenom = document.getElementById("score-denom");
const scorePercent = document.getElementById("score-percent");
const correctCountEl = document.getElementById("correct-count");
const incorrectCountEl = document.getElementById("incorrect-count");
const timeoutCountEl = document.getElementById("timeout-count");
const resultTrophy = document.getElementById("result-trophy");
const resultTagline = document.getElementById("result-tagline");
const resultMessage = document.getElementById("result-message");

let selectedCount = 15;
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timedOutAnswers = 0;
let answered = false;
let timerInterval = null;
let timeLeft = 60;

const answerBtns = answerOptions.querySelectorAll(".answer-btn");


const showScreen = (screenEl) => {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultsScreen.classList.remove("active");
  screenEl.classList.add("active");
};


const countBtns = countGrid.querySelectorAll(".count-btn");

countBtns.forEach((btn) => {
  btn.addEventListener("click", () => {

    countBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    const value = btn.getAttribute("data-count");
    if (value === "all") {
      selectedCount = questionBank.length;
    } else {
      selectedCount = parseInt(value, 10);
    }
  });
});


const shuffleArray = (arr) => {

  const copy = [];
  let i = 0;
  while (i < arr.length) {
    copy.push(arr[i]);
    i = i + 1;
  }

  let idx = copy.length - 1;
  while (idx > 0) {
    const r = Math.floor(Math.random() * (idx + 1));
    const temp = copy[idx];
    copy[idx] = copy[r];
    copy[r] = temp;
    idx = idx - 1;
  }
  return copy;
};

const stopTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerBox.classList.remove("warning", "danger");
};

const startTimer = () => {
  stopTimer();

  timeLeft = 60;
  timerText.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft = timeLeft - 1;
    timerText.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerBox.classList.remove("warning");
      timerBox.classList.add("danger");
    } else if (timeLeft <= 15) {
      timerBox.classList.remove("danger");
      timerBox.classList.add("warning");
    }

    if (timeLeft <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 1000);
};


const loadQuestion = () => {
  answered = false;

  stopTimer();

  const total = quizQuestions.length;
  const qNum = currentQuestionIndex + 1;
  const current = quizQuestions[currentQuestionIndex];

  questionCounter.textContent = `Question ${qNum} of ${total}`;
  qTag.textContent = `Q${qNum}`;

  questionText.textContent = current.question;

  const pct = Math.round((currentQuestionIndex / total) * 100);
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `${pct}% completed`;


  answerBtns.forEach((btn, index) => {
    btn.textContent = current.options[index];
    btn.setAttribute("data-index", index);
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });

  feedbackEl.className = "feedback-banner hidden";
  nextBtn.classList.add("hidden");

  startTimer();
};


const handleAnswer = (clickedIndex) => {
  if (answered) {
    return;
  }
  answered = true;

  stopTimer();

  const current = quizQuestions[currentQuestionIndex];

  let correctIndex = 0;
  let i = 0;
  while (i < current.options.length) {
    if (current.options[i] === current.correctAnswer) {
      correctIndex = i;
    }
    i = i + 1;
  }
  answerBtns.forEach((btn) => {
    btn.disabled = true;
  });

  if (clickedIndex === correctIndex) {
    score = score + 1;
    correctAnswers = correctAnswers + 1;
    answerBtns[clickedIndex].classList.add("correct");
    feedbackEl.textContent = "✅  Correct! Well done.";
    feedbackEl.className = "feedback-banner feedback-correct";
  } else {
    incorrectAnswers = incorrectAnswers + 1;
    answerBtns[clickedIndex].classList.add("wrong");
    answerBtns[correctIndex].classList.add("correct");
    feedbackEl.textContent = "❌  Incorrect. The correct answer is highlighted.";
    feedbackEl.className = "feedback-banner feedback-wrong";
  }

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtnText.textContent = "See Results";
  } else {
    nextBtnText.textContent = "Next Question";
  }
  nextBtn.classList.remove("hidden");
};


const handleTimeout = () => {
  if (answered) {
    return;
  }
  answered = true;

  const current = quizQuestions[currentQuestionIndex];

  let correctIndex = 0;
  let i = 0;
  while (i < current.options.length) {
    if (current.options[i] === current.correctAnswer) {
      correctIndex = i;
    }
    i = i + 1;
  }

  answerBtns.forEach((btn) => { btn.disabled = true; });
  answerBtns[correctIndex].classList.add("correct");

  timedOutAnswers = timedOutAnswers + 1;

  feedbackEl.textContent = "⏰  Time's up! No points awarded. The correct answer is highlighted.";
  feedbackEl.className = "feedback-banner feedback-timeout";

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtnText.textContent = "See Results";
  } else {
    nextBtnText.textContent = "Next Question";
  }
  nextBtn.classList.remove("hidden");
};

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  timedOutAnswers = 0;
  answered = false;

  const howMany = Math.min(selectedCount, questionBank.length);
  const shuffled = shuffleArray(questionBank);
  quizQuestions = [];
  let i = 0;
  while (i < howMany) {
    quizQuestions.push(shuffled[i]);
    i = i + 1;
  }

  showScreen(quizScreen);
  loadQuestion();
};

const handleNext = () => {
  currentQuestionIndex = currentQuestionIndex + 1;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};


const showResults = () => {
  stopTimer();

  const total = quizQuestions.length;
  const pct = Math.round((score / total) * 100);

  finalScoreEl.textContent = score;
  scoreDenom.textContent = `/ ${total}`;
  scorePercent.textContent = `${pct}%`;
  correctCountEl.textContent = correctAnswers;
  incorrectCountEl.textContent = incorrectAnswers;
  timeoutCountEl.textContent = timedOutAnswers;

  if (pct === 100) {
    resultTrophy.textContent = "🏆";
    resultTagline.textContent = "Perfect score!";
    resultMessage.textContent = "Flawless! Every single answer was correct. Outstanding!";
  } else if (pct >= 80) {
    resultTrophy.textContent = "🌟";
    resultTagline.textContent = "Excellent work!";
    resultMessage.textContent = "Great result! A little more revision and you'll hit 100% next time.";
  } else if (pct >= 60) {
    resultTrophy.textContent = "👍";
    resultTagline.textContent = "Good job!";
    resultMessage.textContent = "Solid effort! Review the topics you missed and try again.";
  } else if (pct >= 40) {
    resultTrophy.textContent = "📚";
    resultTagline.textContent = "Keep studying!";
    resultMessage.textContent = "Decent attempt. Focus on the missed topics and give it another go!";
  } else {
    resultTrophy.textContent = "💪";
    resultTagline.textContent = "Don't give up!";
    resultMessage.textContent = "Every expert started as a beginner. Study, practice, and try again!";
  }

  showScreen(resultsScreen);
};


const restartQuiz = () => {
  stopTimer();

  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  timedOutAnswers = 0;
  answered = false;
  quizQuestions = [];

  progressBar.style.width = "0%";
  progressLabel.textContent = "0% completed";
  timerText.textContent = "60";

  showScreen(startScreen);
};


startBtn.addEventListener("click", () => {
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  handleNext();
});

restartBtn.addEventListener("click", () => {
  restartQuiz();
});

answerBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    handleAnswer(index);
  });
});
