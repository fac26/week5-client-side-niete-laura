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
  //Initializes a state called board, using the useState hook with the initial state of board being used to create a new instance of the board. With the setBoard function being used to update the state later.
  const [board, setBoard] = useState(new Board());
  //Handles keyboard events and is called by the custom useEvent hook when a key is pressed.
  const handleKeyDown = (event) => {
    // If the game has been won, it returns without doing anything.
    if (board.hasWon()) {
      return;
    }
    //If an arrow key is pressed (keyCode between 37 and 40 inclusive)...
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      //It creates a new instance of the Board class called boardClone, with the same properties as the current board.
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      //It calls the move method of boardClone with a direction value calculated from the keyCode.
      let newBoard = boardClone.move(direction);
      //It sets the state of board to the new board.
      setBoard(newBoard);
    }
  };
  //This line uses the useState hook to add an event listener to listen out for a key being pressed and running the function handleKeyDown when a key is pressed.
  useEvent("keydown", handleKeyDown);

  //This code creates a nested array of 'cell' components, representing the empty cells on the gameboard
  //It maps over each row of the board.cells array and...
  const cells = board.cells.map((row, rowIndex) => {
    return (
      //...creates a <div> element with a unique key attribute for each row.
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          //It maps over each column of the board.cells array and...
          //...returns a Cell component with a unique key attribute for each cell based on its row and column index.
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  // Creates an array of 'Tile' components
  const tiles = board.tiles
    //It filters out any tile objects from the board.tiles array that have a value of 0, meaning they aren't rendered on the board
    .filter((tile) => tile.value !== 0)
    //It maps over the remaining tiles to create a new array of Tile components, passing in each individual tile as a prop, and assigning each component a unique key attribute based on its index in the array.
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  // Resets the board to its initial state
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
