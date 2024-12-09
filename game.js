document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const gridSize = 5;
    const squares = [];
    
    // Initialize game board
    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("click", () => toggleSquare(i));
        squares.push(square);
        grid.appendChild(square);
    }

    // Randomly generate the initial configuration of lights
    function randomizeBoard() {
        const randomClicks = Math.floor(Math.random() * (gridSize * gridSize));
        for (let i = 0; i < randomClicks; i++) {
            const randIndex = Math.floor(Math.random() * squares.length);
            toggleSquare(randIndex);
        }
    }

    // Toggle the state of a square (on or off)
    function toggleSquare(index) {
        const square = squares[index];
        square.classList.toggle("on");
        const neighbors = getNeighbors(index);
        neighbors.forEach(neighborIndex => {
            squares[neighborIndex].classList.toggle("on");
        });
        checkWin();
    }

    // Get neighboring squares
    function getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        if (row > 0) neighbors.push(index - gridSize); // Top
        if (row < gridSize - 1) neighbors.push(index + gridSize); // Bottom
        if (col > 0) neighbors.push(index - 1); // Left
        if (col < gridSize - 1) neighbors.push(index + 1); // Right

        return neighbors;
    }

    // Check if all squares are off
    function checkWin() {
        const isWon = squares.every(square => !square.classList.contains("on"));
        if (isWon) {
            setTimeout(() => {
                alert("You win!");
                resetBoard();
            }, 300);
        }
    }

    // Reset the game board
    function resetBoard() {
        squares.forEach(square => square.classList.remove("on"));
        randomizeBoard();
    }

    // Initialize the game
    randomizeBoard();
});
