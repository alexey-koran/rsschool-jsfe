/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
const deleteDigit = (n) => {
  const numStr = n.toString();

  let maxNum = -Infinity;

  for (let i = 0; i < numStr.length; i += 1) {
    const newNum = Number(numStr.slice(0, i) + numStr.slice(i + 1));

    maxNum = Math.max(maxNum, newNum);
  }

  return maxNum;
}

module.exports = {
  deleteDigit
};
