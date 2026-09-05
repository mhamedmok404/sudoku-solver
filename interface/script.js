const grid = document.getElementById("grid");

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("cell");

    // Ajoute une bordure épaisse en bas toutes les 3 lignes (sauf la dernière)
    if ((row + 1) % 3 === 0 && row !== 8) {
      input.classList.add("row-thick");
    }

    // N'accepte que les chiffres de 1 à 9
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^1-9]/g, "");
    });

    // Navigation au clavier (flèches) entre les cases
    input.addEventListener("keydown", (e) => {
      const index = row * 9 + col;
      const inputs = document.querySelectorAll(".cell");
      if (e.key === "ArrowRight" && inputs[index + 1])
        inputs[index + 1].focus();
      if (e.key === "ArrowLeft" && inputs[index - 1]) inputs[index - 1].focus();
      if (e.key === "ArrowDown" && inputs[index + 9]) inputs[index + 9].focus();
      if (e.key === "ArrowUp" && inputs[index - 9]) inputs[index - 9].focus();
    });

    grid.appendChild(input);
  }
}

function clearGrid() {
  document.querySelectorAll(".cell").forEach((cell) => (cell.value = ""));
}
function getGrid() {
  const cells = document.querySelectorAll(".cell");
  grille = [];
  for (let i = 0; i < 9; i++) {
    line = [];
    for (let j = 0; j < 9; j++) {
      const valeur = cells[i * 9 + j].value;
      line.push(valeur == "" ? 0 : -parseInt(valeur, 10));
    }
    grille.push(line);
  }
  return grille;
}

async function solveSudoku() {
  const grid = getGrid();
  console.log("solving....");

  const response = await fetch(
    "https://sudoku-solver-m43v.onrender.com/solve",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        grid: grid,
      }),
    },
  );
  const data = await response.json();
  if (data) {
    console.log("solved");
  }
  if (data.solved) {
    displaySolution(data.solution);
  }
}

function displaySolution(solution) {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = solution[i][j];
    }
  }
}
