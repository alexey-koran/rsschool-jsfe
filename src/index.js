function eval() {
    // Do not use eval!!!
    return;
}

const calculate = (a, b, sign) => {
    switch (sign) {
        case '*':
            return +a * +b;
        case '/':
            if (b == 0) throw new TypeError('TypeError: Division by zero.');
            return +a / +b;
        case '+':
            return +a + +b;
        case '-':
            return +a - +b;
    }
}

const calculator = (expr) => {
    let exprArray = expr.split(' ');

    for (let i = 0; i < exprArray.length - 1; i++) {
        if (exprArray[i] == '*' || exprArray[i] == '/'){
            exprArray[i] = calculate(+exprArray[i - 1], exprArray[i + 1], exprArray[i]);
            exprArray.splice(i - 1, 1);
            exprArray.splice(i, 1);
            i -= 1;
        }
    }

    for (let i = 0; i < exprArray.length - 1; i++) {
        if (exprArray[i] == '+' || exprArray[i] == '-'){
            exprArray[i] = calculate(+exprArray[i - 1], exprArray[i + 1], exprArray[i]);
            exprArray.splice(i - 1, 1);
            exprArray.splice(i, 1);
            i -= 1;
        }
    }

    return +(exprArray[0]);
}

const expressionCalculator = (expr) => {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');

    let opened_bracket = expr.match(/\(/g) != null ? expr.match(/\(/g).length : 0;
    let closed_bracket = expr.match(/\)/g) != null ? expr.match(/\)/g).length : 0;

    if (opened_bracket !== closed_bracket) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    for (let i = 0; i < opened_bracket; i++){
        expr = expr.replace(expr.match(/\([\d\+\/\*\-. ]+\)/)[0], calculator(expr.match(/\([\d\+\/\*\-. ]+\)/)[0].replace('(','').replace(')','')));
    }

    return calculator(expr);
}

module.exports = {
    expressionCalculator
}
