import assert from 'assert';
import { towelSort } from './src/index.mjs';

describe('.towelSort, should perform \'towelSort\'', () => {
  it('Should return empty array if no params passed', () => {
    assert.deepEqual(towelSort(), []);
  });

  it('Should return empty array if matrix is empty', () => {
    assert.deepEqual(towelSort([]), []);
  });

  it('should do towelSort', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 4, 3 ]);
  });

  it('should do towelSort', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 3, 6, 5, 4, 7, 8, 9 ]);
  });

  it('should do towelSort', () => {
    const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 3, 4, 8, 7, 6, 5, 9, 10, 11, 12, 16, 15, 14, 13 ]);
  });

  it('should do towelSort correctly with non square matrix', () => {
    const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 3, 4, 8, 7, 6, 5, 9, 10, 11, 12 ]);
  });

  it('should do towelSort', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 3, 6, 5, 4, ]);
  });

  it('should do towelSort', () => {
    const matrix = [
        [1, 2, 4],
        [5, 6, 7, 8],
        [9, 12],
    ];

    assert.deepEqual(towelSort(matrix), [ 1, 2, 4, 8, 7, 6, 5, 9, 12 ]);
  });
});
