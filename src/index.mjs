const towelSort = (matrix) => Array.isArray(matrix) ?
  matrix.map((array, i) => i % 2 ? array.reverse() : array).flat() : [];

export { towelSort }
