import sudoku_logic

def test_generate_puzzle():
    puzzle, solution = sudoku_logic.generate_puzzle(35)
    assert len(puzzle) == 9
    assert len(solution) == 9


def test_puzzle_has_empty_cells():
    puzzle, solution = sudoku_logic.generate_puzzle(35)
    empty = sum(row.count(0) for row in puzzle)
    assert empty > 0


def test_solution_has_no_empty_cells():
    _, solution = sudoku_logic.generate_puzzle(35)
    for row in solution:
        assert 0 not in row


def test_easy_has_more_clues():
    easy, _ = sudoku_logic.generate_puzzle(45)
    hard, _ = sudoku_logic.generate_puzzle(25)
    easy_clues = sum(cell != 0 for row in easy for cell in row)
    hard_clues = sum(cell != 0 for row in hard for cell in row)
    assert easy_clues > hard_clues

def test_is_safe():
    board = sudoku_logic.create_empty_board()
    assert sudoku_logic.is_safe(board, 0, 0, 5)
    board[0][0] = 5
    assert not sudoku_logic.is_safe(board, 0, 1, 5)

def test_generated_puzzle_has_unique_solution():
    puzzle, _ = sudoku_logic.generate_puzzle(35)
    # Create a copy so the original puzzle is not modified
    puzzle_copy = [row[:] for row in puzzle]
    assert sudoku_logic.count_solutions(puzzle_copy) == 1