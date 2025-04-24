const towelSort = (matrix) => {
  if (!Array.isArray(matrix)) {
    return [];
  }

  return matrix.map((array, i) => i % 2 ? array.toReversed() : array).flat();
}

export { towelSort }
