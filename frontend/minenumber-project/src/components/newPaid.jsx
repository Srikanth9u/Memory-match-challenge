


import {useState} from 'react';
const Table = () => {
   // Initial numbers in the table
   const initialNumbers = [
    [3, 2, 3, 5],
    [4, 5, 6, 1],
    [7, 8, 9, 0],
  ];

  // State to keep track of the current numbers in the table
  const [numbers, setNumbers] = useState(initialNumbers);
  const handleGame = (rowIndex, colIndex) => {
    setNumbers((prevNumbers) =>
      prevNumbers.map((row, rIdx) =>
        row.map((num, cIdx) =>
          // If the clicked cell, toggle between "X" and its original value
          rIdx === rowIndex && cIdx === colIndex ? (num === "X" ? initialNumbers[rIdx][cIdx] : "X") : num
        )
      )
    );
  };
            
  
  return (
    <div>
      <table border="1" style={{ borderCollapse: "collapse", width: "200px", textAlign: "center" }}>
      <tbody>
        {numbers.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((num, colIndex) => (
              <td key={colIndex} style={{ padding: "10px" }}>
                  <button onClick={()=>handleGame(rowIndex,colIndex)}>{num}</button>
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