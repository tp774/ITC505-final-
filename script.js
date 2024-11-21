document.addEventListener("DOMContentLoaded", () => {
    const gridSize = 5;
    const gameBoard = document.getElementById("gameBoard");
    const cells = [];

    // Create the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    // Toggle a cell and its neighbors
    function toggleCell(index) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        function toggle(r, c) {
            if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
                const cellIndex = r * gridSize + c;
                cells[cellIndex].classList.toggle("is-off");
            }
        }

        toggle(row, col); // Current cell
        toggle(row - 1, col); // Top neighbor
        toggle(row + 1, col); // Bottom neighbor
        toggle(row, col - 1); // Left neighbor
        toggle(row, col + 1); // Right neighbor
    }

    // Randomize board with a solveable configuration
    function randomizeBoard() {
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
            toggleCell(randomIndex);
        }
    }

    // Check if the game is won
    function checkWin() {
        const allOff = cells.every(cell => !cell.classList.contains("is-off"));
        if (allOff) {
            setTimeout(() => {
                alert("You win!");
                randomizeBoard();
            }, 100);
        }
    }

    // Add click event listeners to cells
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            toggleCell(index);
            checkWin();
        });
    });

    // Start the game
    randomizeBoard();
});
