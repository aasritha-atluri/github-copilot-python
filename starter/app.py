from flask import Flask, render_template, jsonify, request
import sudoku_logic

app = Flask(__name__)

# Keep a simple in-memory store for current puzzle and solution
CURRENT = {
    'puzzle': None,
    'solution': None
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new')
def new_game():
    difficulty = request.args.get('difficulty', 'medium')
    if difficulty == 'easy':
        clues = 45
    elif difficulty == 'hard':
        clues = 25
    else:
        clues = 35
    puzzle, solution = sudoku_logic.generate_puzzle(clues)
    CURRENT['puzzle'] = puzzle
    CURRENT['solution'] = solution
    return jsonify({
        'puzzle': puzzle,
        'difficulty': difficulty
    })

@app.route('/check', methods=['POST'])
def check_solution():
    data = request.get_json(silent=True) or {}
    board = data.get("board")
    solution = CURRENT.get("solution")
    if solution is None:
        return jsonify({"error": "No game in progress"}), 400
    is_valid_board = (
        isinstance(board, list)
        and len(board) == sudoku_logic.SIZE
        and all(
            isinstance(row, list)
            and len(row) == sudoku_logic.SIZE
            and all(
                isinstance(value, int) and 0 <= value <= 9
                for value in row
            )
            for row in board
        )
    )
    if not is_valid_board:
        return jsonify({
            "error": "Board must be a 9x9 grid of integers from 0 to 9"
        }), 400
    incorrect = []
    for i in range(sudoku_logic.SIZE):
        for j in range(sudoku_logic.SIZE):
            if board[i][j] != solution[i][j]:
                incorrect.append([i, j])
    return jsonify({
        "incorrect": incorrect
    })

@app.route('/hint')
def hint():
    puzzle = CURRENT.get('puzzle')
    solution = CURRENT.get('solution')
    if puzzle is None or solution is None:
        return jsonify({'error': 'No game in progress'}), 400
    for i in range(sudoku_logic.SIZE):
        for j in range(sudoku_logic.SIZE):
            if puzzle[i][j] == 0:
                puzzle[i][j] = solution[i][j]
                return jsonify({
                    'row': i,
                    'col': j,
                    'value': solution[i][j]
                })
    return jsonify({'message': 'Puzzle already complete'})

@app.route('/validate', methods=['POST'])
def validate():
    data = request.get_json(silent=True) or {}
    row = data.get("row")
    col = data.get("col")
    value = data.get("value")
    if not (
        isinstance(row, int)
        and isinstance(col, int)
        and isinstance(value, int)
    ):
        return jsonify({
            "error": "row, col and value must be integers"
        }), 400
    if not (
        0 <= row < sudoku_logic.SIZE
        and 0 <= col < sudoku_logic.SIZE
        and 1 <= value <= 9
    ):
        return jsonify({
            "error": "Invalid row, column or value"
        }), 400
    solution = CURRENT.get("solution")
    if solution is None:
        return jsonify({
            "error": "No game in progress"
        }), 400
    return jsonify({
        "valid": solution[row][col] == value
    })

if __name__ == '__main__':
    app.run(debug=True)