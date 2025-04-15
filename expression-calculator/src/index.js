const calculate = ({ a, b, sign }) => {
  const x = Number(a);
  const y = Number(b);

  const signMap = {
    '*': () => x * y,
    '+': () => x + y,
    '-': () => x - y,
    '/':
      y === 0
        ? () => {
            throw new TypeError('TypeError: Division by zero.');
          }
        : () => x / y,
  };

  return signMap[sign]();
};

const calculator = (expr) => {
  if (expr.startsWith('(') && expr.endsWith(')')) {
    expr = expr.slice(1, -1);
  }

  const tokens = expr.split(' ');

  while (tokens.length > 1) {
    let signIndex = tokens.findIndex((item) => item === '*' || item === '/');

    if (signIndex === -1) {
      signIndex = tokens.findIndex((item) => item === '+' || item === '-');
    }

    if (signIndex === -1) {
      return String(tokens[0]);
    }

    const a = tokens[signIndex - 1];
    const b = tokens[signIndex + 1];
    const sign = tokens[signIndex];

    tokens.splice(signIndex - 1, 3, calculate({ a, b, sign }));
  }

  return String(tokens[0]);
}

const findDeepestGroup = (expr) => expr.match(/\([\d.*/+-\s]+\)/)?.[0];

const expressionCalculator = (expr) => {
  let expression = expr.replace(/\s/g, '').replace(/[*/+-]/g, ' $& ');

  const openBracketCount = expression.match(/\(/g)?.length;
  const closeBracketCount = expression.match(/\)/g)?.length;

  if (openBracketCount !== closeBracketCount) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  let deepestGroup = findDeepestGroup(expression);

  while (deepestGroup !== undefined) {
    expression = expression.replace(deepestGroup, calculator(deepestGroup));
    deepestGroup = findDeepestGroup(expression);
  }

  return Number(calculator(expression));
}

module.exports = {
  expressionCalculator,
}
