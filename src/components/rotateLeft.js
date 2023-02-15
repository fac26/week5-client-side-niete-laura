// function to take the board matrix as an input and returns a new matrix that is the result of rotating the input matrix 90 degrees counterclockwise

const rotateLeft = function (matrix) {
  let rows = matrix.length;
  let columns = matrix[0].length;
  let res = [];
  for (let row = 0; row < rows; ++row) {
    res.push([]);
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};

export default rotateLeft;
