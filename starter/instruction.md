# GitHub Copilot Usage Report

## Project

This project involved improving a Sudoku game built with Python Flask by using GitHub Copilot. The aim was to make the application more interactive, improve the user interface, and add several new features while keeping the code organized and easy to maintain.

---

## Objective

The main objective was to understand how GitHub Copilot can assist during software development. Instead of writing every line of code manually, Copilot was used to generate suggestions, which were then reviewed, modified, and tested before being added to the project.

---

## How I Used GitHub Copilot

Throughout the project, I used GitHub Copilot Chat and code completion to speed up development. Some of the prompts I used included:

- Add a timer to the Sudoku game.
- Create difficulty levels for the game.
- Add a Hint button.
- Highlight invalid Sudoku entries while typing.
- Create a Dark Mode option.
- Save the top scores using browser local storage.
- Make the application responsive on smaller screens.
- Generate Sudoku puzzles with a unique solution.
- Write Pytest test cases.

The suggestions provided by Copilot helped reduce development time, but I reviewed every change before using it.

---

## Features Added

The following improvements were made to the application:

- Difficulty selection (Easy, Medium, Hard)
- Timer to record solving time
- Hint feature
- Check Solution button
- Real-time validation of user input
- Dark Mode
- Alternate colours for 3×3 Sudoku blocks
- Top 10 scoreboard using Local Storage
- Responsive layout for desktop and mobile devices
- Sudoku puzzles with a unique solution
- Automated testing using Pytest

---

## My Experience

GitHub Copilot was helpful for generating code quickly, especially for JavaScript functions, Flask routes, and CSS styling. It also suggested useful approaches for implementing the timer, hint feature, and validation logic.

However, not every suggestion worked perfectly. I had to understand the generated code, make changes where necessary, and test everything before moving on.

---

## Challenges Faced

While working on the project, I came across a few issues:

- Setting up the Python virtual environment.
- Fixing JavaScript errors during development.
- Resolving Pytest import errors.
- Improving the Sudoku generation logic so each puzzle has only one solution.
- Making sure the layout worked properly on mobile devices.

These issues were solved by debugging the code, testing each feature, and modifying some of the code suggested by GitHub Copilot.

---

## Testing

Pytest was used to verify that the main functionality worked correctly. The test cases covered:

- Sudoku puzzle generation
- Sudoku solution generation
- Empty cell validation
- Difficulty level comparison
- Sudoku safety checks

All five test cases passed successfully.

```
5 tests passed successfully. 
```

---

## Conclusion

This project gave me practical experience using GitHub Copilot during software development. It helped me write code faster and provided useful suggestions, but I still needed to understand the logic, fix errors, and test the application carefully.

Overall, GitHub Copilot acted as a helpful coding assistant rather than a replacement for development and debugging. The final application meets the required project objectives and includes all the requested features.
