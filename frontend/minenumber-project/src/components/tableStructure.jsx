import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to shuffle the 2d array with numbers and bombs
const shuffleGrid = () => {
  let items = [5, 2, 3, 8, 2, 8, 3, 5,1,1]; // All numbers (excluding "B")
  let bombs = Array(2).fill("B"); // 4 "B" elements
  let mixed = [...items, ...bombs].sort(() => Math.random() - 0.5); // Shuffle array

  return [
    mixed.slice(0, 4),
    mixed.slice(4, 8),
    mixed.slice(8, 12),
  ];
};

const Table = () => {
  // stores the initialized values
  const [initialNumbers, setInitialNumbers] = useState([]);
  // track cells are revealed
  const [revealed, setRevealed] = useState([]);
  // store the selected numbers
  const [selected, setSelected] = useState([]);
  // track if the game is over
  const [gameOver, setGameOver] = useState(false);
  // Game status message
  const [game, setGame] = useState("Good Luck!");
  // Score counter (number of matched pairs)
  const [score, setScore] = useState(0);
  // Click counter
  const [clicks, setClicks] = useState(0);

  // Runs once on component mount to shuffle the grid
  useEffect(() => {
    const grid = shuffleGrid();
    setInitialNumbers(grid);
    setRevealed(Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(false)));
  }, []);

  // Function to handle button clicks
  const handleGame = (row, col) => {
    if (gameOver || revealed[row][col]) return; // Ignore clicks if game over or already revealed

    if (initialNumbers[row][col] === "B") {
      setGameOver(true); 
      setGame("Sorry, better luck next time!");
      return;
    }

    setClicks(prev => prev + 1); 
    // Reveals clicked cell
    const newRevealed = revealed.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? true : c))
    );
    setRevealed(newRevealed);

    // Stores selected number
    const newSelected = [...selected, { num: initialNumbers[row][col], row, col }];

    if (newSelected.length === 2) {
     
      if (newSelected[0].num === newSelected[1].num) {
        // If match, increase the score
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore === 5) setGame("You Win! "); 
          return newScore;
        });
        setSelected([]); // Reset selected numbers
      } else {
        
        setTimeout(() => {
          setRevealed(prev =>
            prev.map((r, rIndex) =>
              r.map((c, cIndex) =>
                (rIndex === newSelected[0].row && cIndex === newSelected[0].col) ||
                (rIndex === newSelected[1].row && cIndex === newSelected[1].col)
                  ? false
                  : c
              )
            )
          );
          setSelected([]); // Reset selected numbers
        }, 1000);
      }
    } else {
      setSelected(newSelected); // Update selected numbers
    }
  };

  // restart the game without page refresh
  const restartGame = () => {
    setInitialNumbers(shuffleGrid()); // Generate a new random grid
    setRevealed(Array(3).fill(null).map(() => Array(4).fill(false))); // Reset revealed cells
    setSelected([]); // Clear selected numbers
    setGameOver(false); // Reset game state
    setGame("Good Luck!"); // Reset game message
    setScore(0); // Reset score
    setClicks(0); // Reset click counter
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card text-center shadow-lg p-4" style={{ minWidth: "350px" }}>
       
        <h1 className="mb-3">{game}</h1>
        <h3 className="mb-2">Score: <span className="badge bg-success">{score}</span></h3>
        <h4 className="mb-3">Clicks: <span className="badge bg-info">{clicks}</span></h4>

        
        <table className="table table-bordered mx-auto w-auto">
          <tbody>
            {initialNumbers.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((num, colIndex) => (
                  <td key={colIndex} className="p-2">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleGame(rowIndex, colIndex)}
                      style={{ height: "50px", fontSize: "1.2rem" }}
                    >
                      {revealed[rowIndex][colIndex] ? num : "X"}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Restart button (only shown when game over) */}
        {gameOver && (
          <button className="btn btn-danger mt-3" onClick={restartGame}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
