// Takes the useState hook from React
import { useState } from "react";

// Takes the custom made useEvent hook from useEvent.jsx
import useEvent from "../hooks/useEvent";

//Calls the components Tile, Cell, and GameOverlay
import Tile from "./Tile";
import Cell from "./Cell";
import GameOverlay from "./GameOverlay";
import { Board } from "./game-logic.js";

//Declares Boardview component as a function
const BoardView = () => {
  //Initializes a state called board, using the useState hook with the initial state of board being used to create the board.
  const [board, setBoard] = useState(new Board());

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      // event.preventDefault();
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  // Creates an array of 'Tile' components
  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div className="game-container">
      <div className="details-box">
        <div className="newgameButton" onClick={resetGame}>
          new game
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {board.hasLost() && <GameOverlay onRestart={resetGame} board={board} />}
        {cells}
        {tiles}
      </div>
    </div>
  );
};

export default BoardView;
