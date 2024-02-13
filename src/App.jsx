import { useState } from "react";
import Board from "./components/Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (index) => {
    setCurrentMove(index);
    setXIsNext(index % 2 === 0);
  };

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = `Go to the move # ${index}`;
    } else {
      description = `Go to start the game`;
    }

    return (
      <li key={index} className="bg-gray-700 text-white m-2 p-1">
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex justify-center p-4">
      <div className="mr-16">
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          handlePlay={handlePlay}
        />
      </div>

      <div className="border border-gray-400 p-1">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
