// Takes the useState hook from React
import { useState } from "react";

// Takes the custom made useEvent hook from useEvent.jsx
import useEvent from "../hooks/useEvent";

//Calls the components Tile, Cell, and GameOverlay
import Tile from "./Tile";
import Cell from "./Cell";
import GameOverlay from "./GameOverlay";
import { Board } from "./gameLogic.js";

//Declares Boardview component as a function
const BoardView = () => {
  //Initializes a state called board, using the useState hook with the initial state of board being used to create a new instance of the board. With the setBoard function being used to update the state later.
  const [board, setBoard] = useState(new Board());
  //Handles keyboard events and is called by the custom useEvent hook when a key is pressed.
  const handleKeyDown = (event) => {
    // If the game has been won, it returns without doing anything.
    if (board.hasWon()) {
      return;
    }
    //If an arrow key is pressed (keyCode between 37 and 40 inclusive), it creates a new instance of the Board class called boardClone, with the same properties as the current board.
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      // boardClonecreates a new instance of the Board class with the same properties as the current board
      let newBoard = boardClone.move(direction); //creates a new instance of the Board class with the same properties as the current board and moves the tiles in the direction of the arrow key pressed.
      setBoard(newBoard);  // calling setBoard with the new board instance will cause the component to rerender and update the UI.
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
        {cells}
        {tiles}
        {board.hasWon() || board.hasLost() ? (
    <GameOverlay onRestart={resetGame} board={board} />
  ) : null}
      </div>
    </div>
  );
};

export default BoardView;
