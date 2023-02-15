//Imports the rotate left component from the file of the same name
import rotateLeft from "./rotateLeft";

// The code below defines a JavaScript class called Tile that represents a tile in the game.
class Tile {
  // This line starts the constructor function of the Tile class that gets called when a new instance of Tile is created.
  constructor(value, row, column) {
    // This line initializes the value property of the Tile object to the value argument passed to the constructor function, or to 0 if no argument is passed. This then links to the code in Board.jsx line 58
    this.value = value || 0;
    // This line initializes the row property of the Tile object to the row argument passed to the constructor function, or to -1 if no argument is passed.
    this.row = row || -1;
    // This line initializes the column property of the Tile object to the column argument passed to the constructor function, or to -1 if no argument is passed.
    this.column = column || -1;
    /*When a tile is moved, its oldRow and oldColumn properties are set to the tile's 
    current row and column before the new row and column values are assigned to the row 
    and column properties. These properties are then used to determine if the tile has moved, 
    and if so, in which direction. */
    this.oldRow = -1;
    this.oldColumn = -1;
    // This line initializes the markForDeletion property of the Tile object to false.
    this.markForDeletion = false;
    // This line initializes the mergedInto property of the Tile object to null.
    this.mergedInto = null;
    // This line initializes the id property of the Tile object to either the current value of id incremented by 1 or to 0 if id is not yet defined.
    this.id = this.id++ || 0;
  }
  moveTo(row, column) {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  }
  /*The isNew method returns true if the tile's oldRow and oldColumn properties are both -1, 
  indicating that the tile has not yet been moved. */
  isNew() {
    return this.oldRow === -1 && !this.mergedInto;
  }
  /*The hasMoved method returns true if the tile has moved to a new position, which is determined 
  by comparing its oldRow and oldColumn values to its row and column values. */
  hasMoved() {
    return (
      (this.fromRow() !== -1 &&
        (this.fromRow() !== this.toRow() ||
          this.fromColumn() !== this.toColumn())) ||
      this.mergedInto
    );
  }
  /*The fromRow and fromColumn methods return the tile's old row and column values if the tile has 
  not been merged, or its current row and column values if it has been merged. */
  fromRow() {
    return this.mergedInto ? this.row : this.oldRow;
  }
  fromColumn() {
    return this.mergedInto ? this.column : this.oldColumn;
  }
  /*The toRow and toColumn methods return the row and column values of the tile it has been merged into, 
  if it has been merged, or its current row and column values if it has not been merged. */
  toRow() {
    return this.mergedInto ? this.mergedInto.row : this.row;
  }
  toColumn() {
    return this.mergedInto ? this.mergedInto.column : this.column;
  }
}

class Board {
  constructor() {
    this.tiles = [];
    this.cells = [];
    this.score = 0;
    this.size = 4;
    this.fourProbability = 0.05;
    this.deltaX = [-1, 0, 1, 0];
    this.deltaY = [0, -1, 0, 1];
    for (let i = 0; i < this.size; ++i) {
      this.cells[i] = [
        this.addTile(),
        this.addTile(),
        this.addTile(),
        this.addTile(),
      ];
    }
    this.addRandomTile();
    this.addRandomTile();
    this.setPositions();
    this.won = false;
  }
  addTile(args) {
    let res = new Tile(args);
    this.tiles.push(res);
    return res;
  }

  moveLeft() {
    let hasChanged = false;
    for (let row = 0; row < this.size; ++row) {
      let currentRow = this.cells[row].filter((tile) => tile.value !== 0);
      let resultRow = [];
      for (let target = 0; target < this.size; ++target) {
        let targetTile = currentRow.length
          ? currentRow.shift()
          : this.addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          let tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          let tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
          this.score += tile1.value + tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= targetTile.value === 2048;
        hasChanged |= targetTile.value !== this.cells[row][target].value;
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }
  setPositions() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }
  addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < this.size; ++r) {
      for (let c = 0; c < this.size; ++c) {
        if (this.cells[r][c].value === 0) {
          emptyCells.push({ r: r, c: c });
        }
      }
    }
    let index = ~~(Math.random() * emptyCells.length);
    let cell = emptyCells[index];
    let newValue = Math.random() < this.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.addTile(newValue);
  }
  move(direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    this.clearOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    let hasChanged = this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }
  clearOldTiles() {
    this.tiles = this.tiles.filter((tile) => tile.markForDeletion === false);
    this.tiles.forEach((tile) => {
      tile.markForDeletion = true;
    });
  }
  hasWon() {
    return this.won;
  }
  hasLost() {
    let canMove = false;
    for (let row = 0; row < this.size; ++row) {
      for (let column = 0; column < this.size; ++column) {
        canMove |= this.cells[row][column].value === 0;
        for (let dir = 0; dir < 4; ++dir) {
          let newRow = row + this.deltaX[dir];
          let newColumn = column + this.deltaY[dir];
          if (
            newRow < 0 ||
            newRow >= this.size ||
            newColumn < 0 ||
            newColumn >= this.size
          ) {
            continue;
          }
          canMove |=
            this.cells[row][column].value ===
            this.cells[newRow][newColumn].value;
        }
      }
    }
    return !canMove;
  }
}

export { Board };
