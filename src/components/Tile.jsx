// import React from "react";
import "../main.css";
import "../styles.css";

const Tile = ({tile}) => {
  // 1. tile
  // 2. tile value (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048)
  // 3. tile current position (x, y)
  // 4. move y direction row from # to #, 
  // 5. move x direction col from # to #
  // 6. can move?
  // 7. is it new?
  // 8. can it merge?
  let classArray = ["tile"];
  classArray.push("tile" + tile.value);
  if (!tile.mergedInto) {
    classArray.push(`position_${tile.row}_${tile.column}`);
  }
  if (tile.mergedInto) {
    classArray.push("merged");
  } 
  if (tile.isNew()) {
    classArray.push("new");
  }
  if (tile.hasMoved()) {
    classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`)
    classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`)
    classArray.push("isMoving");
  }  
  let classes = classArray.join(" ");
  return <span className={classes} />;
}

export default Tile;
