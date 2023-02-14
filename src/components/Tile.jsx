import React from "react";

const Tile = ({ tile }) => {
  //7. New - Creates a new random tile
  //8. Merged - Merges two tiles of the same value into one tile

  //1. Tile
  const classArray = ["tile"];
  //2. Tile#
  classArray.push("tile" + tile.value);
  if (!tile.mergedInto) {
    //3. Position_#_#
    classArray.push(`position_${tile.row}_${tile.column}`);
  }
  if (tile.hasMoved()) {
    //4. Row_from_#_to_#
    classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
    //5. Column_from_#_to_#
    classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
    //6. isMoving
    classArray.push("isMoving");
  }

  if (tile.isNew()) {
    classArray.push("new");
  }
  if (tile.mergedInto) {
    classArray.push("merged");
  }

  const classes = classArray.join(" ");
  return <span className={classes}></span>;
};

export default Tile;
