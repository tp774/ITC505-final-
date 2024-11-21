document.addEventListener("DOMContentLoaded", () => {
    const gridSize = 5;
    const gameBoard = document.getElementById("gameBoard");
    const restartButton = document.getElementById("restartButton");
    let cells = [];

    // Function to create the grid
    function createGrid() {
        cells = []; // Reset the cells array
        gameBoard.innerHTML = ""; // Clear the game board
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
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

    // Randomize the board with a solveable configuration
    function randomizeBoard() {
        cells.forEach(cell => cell.classList.remove("is-off")); // Reset all cells
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

    // Initialize the game
    function initializeGame() {
        createGrid();
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                toggleCell(index);
                checkWin();
            });
        });
        randomizeBoard();
    }

    // Restart button functionality
    restartButton.addEventListener("click", () => {
        initializeGame();
    });

    initializeGame();

    // Update last modified date
    var x = document.lastModified;
    document.getElementById('lastModified').textContent = x;

    // Toggle Addendum visibility
    window.toggleAddendum = function () {
        const content = document.getElementById("addendumContent");
        content.classList.toggle("visible");
    };
});
