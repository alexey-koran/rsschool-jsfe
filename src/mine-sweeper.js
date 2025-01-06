/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
const minesweeper = (matrix) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return matrix.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell) {
        return 1;
      }

      let mineCount = 0;

      directions.forEach(([dx, dy]) => {
        const newRow = rowIndex + dx;
        const newCol = colIndex + dy;

        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < row.length) {
          mineCount += matrix[newRow][newCol] ? 1 : 0;
        }
      });

      return mineCount;
    })
  );
};


module.exports = {
  minesweeper
};
