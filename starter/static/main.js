// Client-side rendering and interaction for the Flask-backed Sudoku
const SIZE = 9;
let puzzle = [];
let timer;
let seconds = 0;
const STORAGE_KEY = 'sudoku_scores';
let hintsUsed = 0;
let currentDifficulty = 'medium';
let gameCompleted = false;
function startTimer() {
    clearInterval(timer);
    seconds = 0;
    updateTimer();
    timer = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `Time: ${mins}:${secs}`;
}

function normalizeScores(rawScores) {
    if (!Array.isArray(rawScores)) {
        return [];
    }

    return rawScores.reduce((normalized, score) => {
        if (typeof score === 'number' && Number.isFinite(score)) {
            normalized.push({
                name: 'Anonymous',
                time: Math.max(0, Math.floor(score)),
                difficulty: 'Unknown',
                hints: 0
            });
            return normalized;
        }

        if (score && typeof score === 'object') {
            const normalizedScore = {
                name: typeof score.name === 'string' && score.name.trim()
                    ? score.name.trim()
                    : 'Anonymous',
                time: Number.isFinite(score.time) ? Math.max(0, Math.floor(score.time)) : 0,
                difficulty: typeof score.difficulty === 'string' && score.difficulty.trim()
                    ? score.difficulty
                    : 'Unknown',
                hints: Number.isFinite(score.hints) ? Math.max(0, Math.floor(score.hints)) : 0
            };
            normalized.push(normalizedScore);
        }

        return normalized;
    }, []);
}

function getStoredScores() {
    try {
        const rawScores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        return normalizeScores(rawScores);
    } catch (error) {
        console.warn('Unable to read scoreboard data, resetting it.', error);
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
}

function saveScore() {
    if (gameCompleted) return;
    gameCompleted = true;
    const playerName =
        document.getElementById('player-name').value.trim() || 'Anonymous';
    const scores = getStoredScores();

    const exists = scores.some(score =>
        score.name === playerName &&
        score.time === seconds &&
        score.difficulty === currentDifficulty &&
        score.hints === hintsUsed
    );

    if (exists) {
        return;
    }

    scores.push({
        name: playerName,
        time: seconds,
        difficulty: currentDifficulty,
        hints: hintsUsed
    });
    scores.sort((a, b) => a.time - b.time);
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(scores.slice(0, 10))
    );
    displayScores();
}

function displayScores() {
    const scores = getStoredScores();
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(scores.slice(0, 10))
    );

    const list = document.getElementById('scoreboard');
    list.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        const mins = String(Math.floor(score.time / 60)).padStart(2, '0');
        const secs = String(score.time % 60).padStart(2, '0');
        li.textContent =
            `${score.name} | ${mins}:${secs} | ${score.difficulty} | Hints: ${score.hints}`;
        list.appendChild(li);
    });
}

function createBoardElement() {
    const boardDiv = document.getElementById('sudoku-board');
    boardDiv.innerHTML = '';
    for (let i = 0; i < SIZE; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'sudoku-row';
        for (let j = 0; j < SIZE; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'sudoku-cell';
            if ((Math.floor(i / 3) + Math.floor(j / 3)) % 2 === 0) {
                input.classList.add('block-light');
            } else {
                input.classList.add('block-dark');
            }
            input.dataset.row = i;
            input.dataset.col = j;
            input.addEventListener('input', async (e) => {
                const val = e.target.value.replace(/[^1-9]/g, '');
                e.target.value = val;
                await validateCell(e.target);
            });
            rowDiv.appendChild(input);
        }
        boardDiv.appendChild(rowDiv);
    }
}

function renderPuzzle(puz) {
  puzzle = puz;
  createBoardElement();
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const idx = i * SIZE + j;
      const val = puzzle[i][j];
      const inp = inputs[idx];
      if (val !== 0) {
        inp.value = val;
        inp.disabled = true;
        inp.className += ' prefilled';
      } else {
        inp.value = '';
        inp.disabled = false;
      }
    }
  }
}

async function newGame() {
  const difficulty = document.getElementById('difficulty').value;
  currentDifficulty = difficulty;
  hintsUsed = 0;
  gameCompleted = false;  
  const res = await fetch(`/new?difficulty=${difficulty}`);
  const data = await res.json();
  renderPuzzle(data.puzzle);
  startTimer();
  document.getElementById('message').innerText = '';
}

async function checkSolution() {
  const boardDiv = document.getElementById('sudoku-board');
  const inputs = boardDiv.getElementsByTagName('input');
  const board = [];
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      const idx = i * SIZE + j;
      const val = inputs[idx].value;
      board[i][j] = val ? parseInt(val, 10) : 0;
    }
  }
  const res = await fetch('/check', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board})
  });
  const data = await res.json();
  const msg = document.getElementById('message');
  if (data.error) {
    msg.style.color = '#d32f2f';
    msg.innerText = data.error;
    return;
  }
  const incorrect = new Set(data.incorrect.map(x => x[0]*SIZE + x[1]));
  for (let idx = 0; idx < inputs.length; idx++) {
    const inp = inputs[idx];
    if (inp.disabled) continue;
    inp.classList.remove('incorrect');
    if (incorrect.has(idx)) {
      inp.classList.add('incorrect');
    }
  }
  if (incorrect.size === 0) {
    msg.style.color = '#388e3c';
    clearInterval(timer);
    saveScore();
    msg.innerText = 'Congratulations! You solved it!';
  } else {
    msg.style.color = '#d32f2f';
    msg.innerText = 'Some cells are incorrect.';
  }
}

async function giveHint() {
    const res = await fetch('/hint');
    const data = await res.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    if (data.message) {
        document.getElementById('message').innerText = data.message;
        return;
    }
    const boardDiv = document.getElementById('sudoku-board');
    const inputs = boardDiv.getElementsByTagName('input');
    const index = data.row * SIZE + data.col;
    inputs[index].value = data.value;
    inputs[index].disabled = true;
    inputs[index].className = 'sudoku-cell prefilled';
    hintsUsed++;
}
async function validateCell(input) {
    if (input.disabled || input.value === '') {
        input.classList.remove('incorrect');
        return;
    }
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const value = parseInt(input.value);
    const res = await fetch('/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            row,
            col,
            value
        })
    });
    const data = await res.json();
    if (data.valid) {
        input.classList.remove('incorrect');
    } else {
        input.classList.add('incorrect');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Wire buttons
window.addEventListener('load', () => {
  document.getElementById('new-game').addEventListener('click', newGame);
  document.getElementById('check-solution').addEventListener('click', checkSolution);
  document.getElementById('hint').addEventListener('click', giveHint);
  document.getElementById('dark-mode').addEventListener('click', toggleDarkMode);
  // initialize
  displayScores();
  newGame();
});