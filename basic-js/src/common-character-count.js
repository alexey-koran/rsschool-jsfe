/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
const getCommonCharacterCount = (s1, s2) => {
  const countCharsInStr = (str) => str.split('').reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});

  const countS1 = countCharsInStr(s1);
  const countS2 = countCharsInStr(s2);

  return Object.keys(countS1).reduce((acc, key) => {
    if (countS1[key] && countS2[key]) {
      return acc + Math.min(countS1[key], countS2[key])
    }

    return acc;
  }, 0);
}

module.exports = {
  getCommonCharacterCount
};
