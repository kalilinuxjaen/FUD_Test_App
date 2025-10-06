import { db, ref, get, child, set } from './firebase-config.js';

const dbRef = ref(db);
let questions = [];
let index = 0;
let score = 0;
let timer = 120; // seconds
const qBox = document.getElementById('question');
const optBox = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const msg = document.getElementById('msg');
const timerEl = document.getElementById('timer');
const reg = sessionStorage.getItem('regNumber') || prompt('Enter your Reg Number:');
sessionStorage.setItem('regNumber', reg);

function loadQuestions() {
  get(child(dbRef, 'questions')).then(snap => {
    if (snap.exists()) {
      questions = Object.values(snap.val());
      showQuestion();
      startTimer();
    } else msg.innerText = '❌ No questions found.';
  });
}

function showQuestion() {
  const q = questions[index];
  qBox.innerText = q.text;
  optBox.innerHTML = '';
  [q.opt1, q.opt2, q.opt3, q.opt4].forEach((o, i) => {
    const b = document.createElement('button');
    b.innerText = o;
    b.onclick = () => checkAnswer(i + 1);
    optBox.appendChild(b);
  });
}

function checkAnswer(selected) {
  const correct = questions[index].correct;
  if (selected == correct) score++;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  if (index < questions.length - 1) {
    index++;
    showQuestion();
  } else endTest();
};

function startTimer() {
  const interval = setInterval(() => {
    timer--;
    timerEl.innerText = '⏱️ ' + timer + 's left';
    if (timer <= 0) {
      clearInterval(interval);
      endTest();
    }
  }, 1000);
}

function endTest() {
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  set(ref(db, 'results/' + reg), { score: percent, date: new Date().toLocaleString() });
  msg.innerText = '✅ Test submitted! Redirecting to result...';
  setTimeout(() => (window.location.href = 'result.html'), 3000);
}

loadQuestions();
