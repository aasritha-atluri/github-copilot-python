# Refactored Sudoku Game using Python Flask and GitHub Copilot

This project is a modernized version of a Sudoku game built with Python Flask. The application was refactored and enhanced using GitHub Copilot by adding several new features, improving the user interface, and making the application more interactive and responsive.

## Features

- Generate valid Sudoku puzzles with a unique solution.
- Difficulty selection (Easy, Medium, Hard).
- Timer to track puzzle completion time.
- Hint button to reveal one correct cell.
- Check Solution button to verify the current board.
- Real-time validation that highlights incorrect entries.
- Top 10 scoreboard stored using browser Local Storage.
- Dark Mode support.
- Alternate 3×3 block colors for better readability.
- Responsive design for desktop and mobile devices.
- Congratulatory message when the puzzle is solved.
- Automated tests using Pytest.

---

## Technologies Used

- Python 3
- Flask
- HTML5
- CSS3
- JavaScript
- GitHub Copilot
- Pytest

---

## Installation

Clone the repository.

```bash
git clone https://github.com/<your-username>/github-copilot-python.git
```

Move into the project folder.

```bash
cd github-copilot-python/starter
```

Create a virtual environment.

```bash
python -m venv .venv
```

Activate the virtual environment.

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

---

## Running the Application

Start the Flask application.

```bash
python app.py
```

Open the browser and visit:

```
http://127.0.0.1:5000
```

---

## Running Tests

Run all test cases using Pytest.

```bash
python -m pytest
```

Expected output:

```text
================== 5 passed ==================
```

---

## Project Structure

```
starter/
│
├── static/
│   ├── main.js
│   └── styles.css
│
├── templates/
│   └── index.html
│
├── tests/
│   └── test_sudoku.py
│
├── app.py
├── sudoku_logic.py
├── requirements.txt
└── README.md
```

---

## GitHub Copilot Usage

GitHub Copilot was used throughout the project to:

- Generate Sudoku UI improvements.
- Implement Dark Mode.
- Implement the Timer.
- Create the Difficulty Selector.
- Generate the Hint functionality.
- Implement real-time validation.
- Improve responsiveness.
- Assist with Local Storage scoreboard.
- Help write Pytest test cases.
- Suggest code refactoring and improvements.

The generated code was reviewed, tested, and modified where necessary before being integrated into the project.

---

## Test Status

All implemented tests pass successfully.

```
5 passed in 0.35s
```