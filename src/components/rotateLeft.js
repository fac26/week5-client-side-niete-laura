/*This code defines a function called rotateLeft that takes a 2-dimensional array (a matrix) as its input and returns a new matrix that is a rotated version of the input matrix. */

//1. The rotateLeft function is defined using the function keyword and a function expression.
const rotateLeft = function (matrix) {
  //2. rows is a variable that stores the number of rows in the input matrix (which is equivalent to the length of the outer array).
  let rows = matrix.length;
  //3. columns is a variable that stores the number of columns in the input matrix.
  let columns = matrix[0].length;
  //4. res is initialized as an empty array. This array will be populated with the rotated matrix.
  let res = [];
  //5. A for loop is used to iterate over each row in the input matrix.
  for (let row = 0; row < rows; ++row) {
    //6. Inside the loop, a new row is added to the res array using push.
    res.push([]);
    //7. Another for loop is used to iterate over each column in the input matrix.
    for (let column = 0; column < columns; ++column) {
      //8. Inside this loop, the value at the current row and column is set to a new position in the res array by indexing matrix with column and columns - row - 1.
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  //9. The res array is returned from the rotateLeft function.
  return res;
};

export default rotateLeft;
