/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
const repeater = (str, options) => {
  let {
    repeatTimes,
    separator,
    addition,
    additionRepeatTimes,
    additionSeparator
  } = options;

  separator = separator || '+';
  additionSeparator = additionSeparator || '|';
  addition = (addition === null) ? 'null' : addition;

  const addStr = new Array(additionRepeatTimes).fill(addition).join(additionSeparator);

  return new Array(repeatTimes).fill(str + addStr).join(separator);
}

module.exports = {
  repeater
};
