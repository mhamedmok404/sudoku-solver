from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from solver import rechercher


app = FastAPI(
    title="Sudoku Solver API",
    description="Sudoku solver using simulated annealing",
    version="1.0.0"
)


# Autoriser le frontend à communiquer avec l'API
app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SudokuRequest(BaseModel):
    grid: list[list[int]] = Field(..., min_length=9, max_length=9)


@app.get("/")
def root():
    return {
        "message": "Sudoku Solver API is running"
    }


@app.post("/solve")
def solve_sudoku(request: SudokuRequest):

    grid = request.grid

    # Vérifier que la grille contient bien 9 lignes
    if len(grid) != 9:
        return {
            "solved": False,
            "message": "The grid must contain exactly 9 rows."
        }

    # Vérifier que chaque ligne contient 9 valeurs
    for row in grid:
        if len(row) != 9:
            return {
                "solved": False,
                "message": "Each row must contain exactly 9 values."
            }

        # Les valeurs doivent être entre 0 et 9
    '''   if any(value < 0 or value > 9 for value in row):
            return {
                "solved": False,
                "message": "Values must be between 0 and 9."
            }'''

    # Résoudre la grille
    solution, score = rechercher(grid)

    return {
        "solved": score == 0,
        "score": score,
        "solution": solution
    }