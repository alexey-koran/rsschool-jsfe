module.exports = function check(str, bracketsConfig) {
  let getBrackets = function(config) {
    return config.map(function(item) {
      return item.join('');
    });
  }
  let brackets = getBrackets(bracketsConfig);
  for (let i = 0; i < brackets.length;) {
      if (str.indexOf(brackets[i]) !== -1) {
        str = str.replace(brackets[i], '');
        i = 0;
      } else {
        i++;
      }
  };
  return !str;
}
