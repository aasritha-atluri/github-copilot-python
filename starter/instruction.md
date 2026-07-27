# GitHub Copilot Project Instructions

## Project Overview

This project is a Flask-based Sudoku game. Use GitHub Copilot to assist with development while keeping the existing project structure, coding style, and functionality.

---

## Development Guidelines

When generating code:

- Preserve the Flask application structure.
- Keep Sudoku logic inside `sudoku_logic.py`.
- Keep client-side functionality inside `static/main.js`.
- Keep styling inside `static/styles.css`.
- Do not duplicate existing functionality.
- Generate readable, modular, and well-commented code.
- Prefer reusable helper functions over repeated code.

---

## Feature Requirements

When implementing new features:

- Maintain Sudoku rules.
- Generate puzzles with exactly one valid solution.
- Support Easy, Medium, and Hard difficulty levels.
- Keep the timer accurate.
- Maintain Hint and Check Solution functionality.
- Highlight incorrect user entries.
- Preserve Dark Mode.
- Keep the application responsive on desktop and mobile devices.

---

## Scoreboard Requirements

When modifying the Top 10 scoreboard:

- Store player name.
- Store completion time.
- Store selected difficulty.
- Store number of hints used.
- Keep only the fastest 10 scores.
- Prevent duplicate score entries.
- Handle older Local Storage data without errors.

---

## Testing Requirements

When generating tests:

- Use Pytest.
- Test Sudoku puzzle generation.
- Verify generated puzzles have exactly one solution.
- Test Sudoku validation functions.
- Test puzzle difficulty generation.
- Ensure all tests pass before accepting changes.

---

## GitHub Copilot Review Process

Do not accept Copilot suggestions without reviewing them.

Before applying generated code:

- Verify correctness.
- Check for edge cases.
- Improve readability if necessary.
- Reject inefficient or unsafe suggestions.
- Document at least one instance where a Copilot suggestion was revised or rejected, explaining why the change improved the implementation.
- Test the application after every significant change.

Always explain important implementation decisions before modifying complex logic.

---

## Coding Standards

- Follow Python best practices.
- Follow modern JavaScript (ES6+) conventions.
- Use descriptive variable names.
- Return consistent JSON responses from Flask routes.
- Validate all user input.
- Keep functions modular and reusable.