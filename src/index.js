module.exports = function check(str, bracketsConfig) {
  let localStr = str;

  const getBrackets = function(config) {
    return config.map(function(item) {
      return item.join('');
    });
  }

  const brackets = getBrackets(bracketsConfig);

  for (let i = 0; i < brackets.length;) {
    if (localStr.indexOf(brackets[i]) !== -1) {
      localStr = localStr.replace(brackets[i], '');
      i = 0;
    } else {
      i++;
    }
  };

  return !localStr;
}
