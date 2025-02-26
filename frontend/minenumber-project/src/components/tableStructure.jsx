import { useState } from "react";
// import "../assets/Table.css"; // Importing the external CSS file

const Table = () => {
  const initialNumbers = [
    [5, 2, 3, 5],
    [4, 5, 6, 1],
    [7, 8, 9, 0],
  ];

  // stores numbers are revealed
  const [revealed, setRevealed] = useState(
    Array(initialNumbers.length)
      .fill(null)
      .map(() => Array(initialNumbers[0].length).fill(false))
  );

  // stores selected numbers for comparison
  const [selected, setSelected] = useState([]);
  
  // tracking score
  const [score, setScore] = useState(0);

  // counter
  const [clicks, setClicks] = useState(0);

  // Function to22 handle button clicks
  const handleGame = (row, col) => {
    if (revealed[row][col]) return; // Prevent clicking already revealed numbers

    setClicks((prev) => prev + 1); // Increment click count

    // Reveal the clicked number
    const newRevealed = revealed.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? true : c))
    );

    setRevealed(newRevealed);

    // Store selected numbers for comparison
    const newSelected = [...selected, { num: initialNumbers[row][col], row, col }];

    if (newSelected.length === 2) {
      // If both selected numbers match
      if (newSelected[0].num === newSelected[1].num) {
        setScore((prev) => prev + 1); // Increase score
        setSelected([]); // Reset selected statew
      } else {
        // Hide unmatched numbers after 1 second
        setTimeout(() => {
          setRevealed((prev) =>
            prev.map((r, rIndex) =>
              r.map((c, cIndex) =>
                (rIndex === newSelected[0].row && cIndex === newSelected[0].col) ||
                (rIndex === newSelected[1].row && cIndex === newSelected[1].col)
                  ? false
                  : c
              )
            )
          );
          setSelected([]); // Reset selected state
        }, 1000);
      }
    } else {
      setSelected(newSelected); // Store selected numbers
    }
  };

  return (
    <div className="game-container">
      <h3>Score: {score}</h3>
      <h4>Clicks: {clicks}</h4>
      <table className="game-table">
        <tbody>
          {initialNumbers.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((num, colIndex) => (
                <td key={colIndex}>
                  <button
                    className="game-button"
                    onClick={() => handleGame(rowIndex, colIndex)}
                  >
                    {revealed[rowIndex][colIndex] ? num : "X"}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;