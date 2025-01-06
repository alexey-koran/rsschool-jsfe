/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
const encodeLine = (str) => {
  let encodedStr = '';
  let count = 1;

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === str[i + 1]) {
      count += 1;
    } else {
      encodedStr += count > 1 ? `${count}${str[i]}` : str[i];
      count = 1;
    }
  }

  return encodedStr;
}

module.exports = {
  encodeLine
};
