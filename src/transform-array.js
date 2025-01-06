/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
const transform = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const discardNext = ({ array, index, before, after }) => {
    const nextElement = array[index + 1];
    const afterNextElement = array[index + 2];

    if (nextElement === undefined) {
      return [...before, ...after];
    }

    if (afterNextElement === '--double-prev') {
      return [...before, ...after.slice(2)];
    }

    if (afterNextElement !== '--discard-prev') {
      return [...before, ...after.slice(1)];
    }

    return [...before, ...after];
  }

  const discardPrev = ({ array, index, before, after }) => {
    const prevElement = array[index - 1];

    if (prevElement !== undefined) {
      return [...before.slice(0, -1), ...after];
    }

    return [...before, ...after];
  }

  const doubleNext = ({ array, index, before, after }) => {
    const nextElement = array[index + 1];

    if (nextElement !== undefined) {
      return [...before, nextElement, ...after];
    }

    return [...before, ...after];
  }

  const doublePrev = ({ array, index, before, after }) => {
    const prevElement = array[index - 1];

    if (prevElement !== undefined) {
      return [...before, prevElement, ...after];
    }

    return [...before, ...after];
  }

  const actions = {
    '--discard-next': discardNext,
    '--discard-prev': discardPrev,
    '--double-prev': doublePrev,
    '--double-next': doubleNext,
  }

  let result = arr;

  for (let index = 0; index < result.length; index += 1) {
    const element = result[index];

    const currentAction = actions[element];

    if (currentAction !== undefined) {
      const before = result.slice(0, index);
      const after = result.slice(index + 1, result.length);

      result = currentAction({ array: result, index, before, after})
    }
  }

  return result;
}

module.exports = {
  transform
};
