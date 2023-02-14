import React, {useState} from "react";
// import Tile from "./Tile";
import Cell from  "./Cell";
import { Board } from "../helper/index.js"

const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  const cells = board.cells.map((row, rowIndex) => {
  return (
    <div>
      {row.map((col, colIndex) => {
      return <Cell />
    })}
    </div>
  );
});

return <div>{cells}</div>
};

export default BoardView;