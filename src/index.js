function eval() {
    // Do not use eval!!!
    return;
}

function calculator(expr) {
    let exprArray = expr.split(' ');
    let i = 0;
    
    while( i < exprArray.length - 1) {
        i++;

        if (exprArray[i] == "*") {
            exprArray[i] = Number(exprArray[i-1]) * Number(exprArray[i+1]);
            exprArray.splice(i-1, 1);
            exprArray.splice(i, 1);
            i = i - 1;
        }

        if (exprArray[i] == "/") {
            if (exprArray[i+1] == 0) throw new TypeError('TypeError: Division by zero.');
            exprArray[i] = Number(exprArray[i-1]) / Number(exprArray[i+1]);
            exprArray.splice(i-1, 1);
            exprArray.splice(i, 1);
            i = i - 1;
        }
    }

    i = 0;
    while( i < exprArray.length - 1) {
        i++;
        if (exprArray[i] == "+") {
            exprArray[i] = Number(exprArray[i-1]) + Number(exprArray[i+1]);
            exprArray.splice(i-1, 1);
            exprArray.splice(i, 1);
            i = i - 1;
        }

        if (exprArray[i] == "-") {
            exprArray[i] = Number(exprArray[i-1]) - Number(exprArray[i+1]);
            exprArray.splice(i-1, 1);
            exprArray.splice(i, 1);
            i = i - 1;
        }
    }
    return Number(exprArray[0]);
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');

    opened_bracket = ((bracket = expr.match(/\(/g)) != null) ? bracket.length : 0;
    closed_bracket = ((bracket = expr.match(/\)/g)) != null) ? bracket.length : 0;

    if (opened_bracket !== closed_bracket) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    let calculate;
    while (opened_bracket > 0){
        if ((calculate = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null ) {
                let str = calculate[0].replace('(','').replace(')','');
                expr = expr.replace(calculate[0], calculator(str));
        }
        opened_bracket -= 1;
    }

    return calculator(expr);;
}

module.exports = {
    expressionCalculator
}
