/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration         *
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch       *
 *                                                                                           *
 ******************************************************************************************* */

/**
 * Determines whether a given number is positive. Zero is considered positive.
 * This function does not use Number or Math class methods.
 *
 * @param {number} number - The number to check.
 * @return {boolean} True if the number is positive or zero, false otherwise.
 *
 * @example:
 *  10 => true
 *  0  => true
 *  -5 => false
 */
function isPositive(number) {
  return number >= 0;
}

/**
 * Returns the maximum of three numbers without using Array and Math classes methods.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @param {number} c - The third number.
 * @return {number} The maximum of the three numbers.
 *
 * @example:
 *  1, 2, 3       => 3
 *  -5, 0, 5      => 5
 *  -0.1, 0, 0.2  => 0.2
 */
function getMaxNumber(a, b, c) {
  const maxOfTwo = (first, second) => (first > second ? first : second);

  return maxOfTwo(a, maxOfTwo(b, c));
}

/**
 * Checks if a queen can capture a king in the next move on an 8x8 chessboard.
 * See more details at https://en.wikipedia.org/wiki/Queen_(chess)
 *
 * @typedef {{
 *  x: number,
 *  y: number
 * }} Position
 * @param {Position} queen - The position of the queen.
 * @param {Position} king - The position of the king.
 * @return {boolean} True if the queen can capture the king, false otherwise.
 *
 * @example
 * {x: 1, y: 1}, {x: 5, y: 5} => true
 * {x: 2, y: 1}, {x: 2, y: 8} => true
 * {x: 1, y: 1}, {x: 2, y: 8} => false
 * {x: 1, y: 1}, {x: 2, y: 8} => false
 */
function canQueenCaptureKing(queen, king) {
  const { x: qX, y: qY } = queen;
  const { x: kX, y: kY } = king;

  const isAtSameColumn = qX === kX;
  const isAtSameLine = qY === kY;

  const isAtSameDiagonal = qX - qY === kX - kY || qX + qY === kX + kY;

  return isAtSameColumn || isAtSameLine || isAtSameDiagonal;
}

/**
 * Determines whether a triangle is isosceles based on its side lengths.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} c - The length of the third side.
 * @return {boolean} True if the triangle is isosceles, false otherwise.
 *
 * @example:
 *  1, 2, 3   => false
 *  3, 1, 2   => false
 *  2, 3, 2   => true
 *  3, 2, 2   => true
 *  2, 2, 3   => true
 *  2, 2, 5   => false
 *  3, 0, 3   => false
 */
function isIsoscelesTriangle(a, b, c) {
  const isValidTriangle = a + b > c && a + c > b && b + c > a;

  return isValidTriangle && (a === b || a === c || b === c);
}

/**
 * Converts a number to Roman numerals. The number will be between 1 and 39.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} num - The number to convert.
 * @return {string} The Roman numeral representation of the number.
 *
 * @example:
 *  1   => I
 *  2   => II
 *  5   => V
 *  10  => X
 *  26  => XXVI
 */
function convertToRomanNumerals(num) {
  const romanAlphabet = {
    ones: [
      [1, 'I'],
      [4, 'IV'],
      [5, 'V'],
      [9, 'IX'],
    ],
    tens: 'X',
  };

  let result = '';

  const tens = Math.floor(num / 10);

  for (let i = 0; i < tens; i += 1) {
    result += romanAlphabet.tens;
  }

  let ones = num % 10;

  for (let i = romanAlphabet.ones.length - 1; i >= 0; i -= 1) {
    const [value, symbol] = romanAlphabet.ones[i];

    while (ones >= value) {
      result += symbol;
      ones -= value;
    }
  }

  return result;
}

/**
 * Converts a number to a string, replacing digits with words.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} numberStr - The number as a string.
 * @return {string} The number with digits replaced by words.
 *
 * @example:
 *  '1'       => 'one'
 *  '10'      => 'one zero'
 *  '-10'     => 'minus one zero'
 *  '10.5'    => 'one zero point five'
 *  '10,5'    => 'one zero point five'
 *  '1950.2'  => 'one nine five zero point two'
 */
function convertNumberToString(numberStr) {
  const alphabet = {
    ',': 'point',
    '.': 'point',
    '-': 'minus',
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  let result = '';

  for (let i = 0; i < numberStr.length; i += 1) {
    const char = numberStr[i];

    switch (result) {
      case '':
        result = alphabet[char];
        break;

      default:
        result = `${result} ${alphabet[char]}`;

        break;
    }
  }

  return result;
}

/**
 * Determines whether a string is a palindrome.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} str - The string to check.
 * @return {boolean} True if the string is a palindrome, false otherwise.
 *
 * @example:
 *  'abcba'     => true
 *  '0123210'   => true
 *  'qweqwe'    => false
 */
function isPalindrome(str) {
  const reverseStr = (s) => {
    let reversedStr = '';

    for (let i = s.length - 1; i >= 0; i -= 1) {
      reversedStr += s[i];
    }

    return reversedStr;
  };

  return str === reverseStr(str);
}

/**
 * Finds the first occurrence of a letter in a string.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} str - The string to search.
 * @param {string} letter - The letter to find.
 * @return {number} The index of the first occurrence of the letter, or -1 if not found.
 *
 * @example:
 *  'qwerty', 'q'     => 0
 *  'qwerty', 't'     => 4
 *  'qwerty', 'Q'     => -1
 *  'qwerty', 'p'     => -1
 */
function getIndexOf(str, letter) {
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === letter) {
      return i;
    }
  }

  return -1;
}

/**
 * Checks if a number contains a specific digit.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} num - The number to check.
 * @param {number} digit - The digit to search for.
 * @return {boolean} True if the number contains the digit, false otherwise.
 *
 * @example:
 *  123450, 5   => true
 *  123450, 1   => true
 *  123450, 0   => true
 *  12345, 0    => false
 *  12345, 6    => false
 */
function isContainNumber(num, digit) {
  let remainingNumber = num;

  while (remainingNumber > 0) {
    const currentDigit = remainingNumber % 10;

    if (currentDigit === digit) {
      return true;
    }

    remainingNumber = Math.trunc(remainingNumber / 10);
  }

  return false;
}

/**
 * Finds the index of an element in an array where the sum of elements to the left equals the sum of elements to the right.
 * If such an index does not return -1.
 * In this task, the use of methods of the Array and String classes is not allowed.
 *
 * @param {number[]} arr - The array to check.
 * @return {number} The index of the balance point, or -1 if none exists.
 *
 * @example:
 *  [1, 2, 5, 3, 0] => 2    => 1 + 2 === 3 + 0 then balance element is 5 and its index = 2
 *  [2, 3, 9, 5] => 2       => 2 + 3 === 5 then balance element is 9 and its index = 2
 *  [1, 2, 3, 4, 5] => -1   => no balance element
 */
function getBalanceIndex(arr) {
  let totalSum = 0;

  for (let i = 0; i < arr.length; i += 1) {
    const element = arr[i];
    totalSum += element;
  }

  let leftSum = 0;

  for (let index = 0; index < arr.length; index += 1) {
    const currentElement = arr[index];

    const rightSum = totalSum - leftSum - currentElement;

    if (rightSum === leftSum) {
      return index;
    }

    leftSum += currentElement;
  }

  return -1;
}

/**
 * Generates a spiral matrix of a given size, filled with numbers in ascending order starting from one.
 * The direction of filling with numbers is clockwise.
 * Usage of String and Array classes methods is not allowed in this task.
 *
 * @param {number} size - The size of the matrix.
 * @return {number[][]} The spiral matrix.
 *
 * @example:
 *        [
 *          [1, 2, 3],
 *  3  =>   [8, 9, 4],
 *          [7, 6, 5]
 *        ]
 *        [
 *          [1,  2,  3,  4],
 *  4  =>   [12, 13, 14, 5],
 *          [11, 16, 15, 6],
 *          [10, 9,  8,  7]
 *        ]
 */
function getSpiralMatrix(size) {
  const result = [];

  let counter = 1;
  let spiral = 0;
  let i = 0;
  let j = 0;

  const matrixSize = size * size + 1;

  while (counter !== matrixSize) {
    if (result[i] === undefined) {
      result[i] = [];
    }

    result[i][j] = counter;

    const currentSize = size - spiral - 1;

    if (i === spiral && j < currentSize) {
      j += 1;
    } else if (j === currentSize && i < currentSize) {
      i += 1;
    } else if (i === currentSize && j > spiral) {
      j -= 1;
    } else {
      i -= 1;
    }

    if (i === spiral + 1 && j === spiral) {
      spiral += 1;
    }

    counter += 1;
  }

  return result;
}

/**
 * Rotates a matrix by 90 degrees clockwise in place.
 * Take into account that the matrix size can be very large. Consider how you can optimize your solution.
 * Usage of String and Array class methods is not allowed in this task.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @return {number[][]} The rotated matrix.
 *
 * @example:
 *  [                 [
 *    [1, 2, 3],        [7, 4, 1],
 *    [4, 5, 6],  =>    [8, 5, 2],
 *    [7, 8, 9]         [9, 6, 3]
 *  ]                 ]
 */
function rotateMatrix(matrix) {
  const result = [];

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix.length; j += 1) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j][i] = matrix[matrix.length - i - 1][j];
    }
  }

  return Object.assign(matrix, result);
}

/**
 * Sorts an array of numbers in ascending order in place.
 * Employ any sorting algorithm of your choice.
 * Take into account that the array can be very large. Consider how you can optimize your solution.
 * In this task, the use of methods of the Array and String classes is not allowed.
 *
 * @param {number[]} arr - The array to sort.
 * @return {number[]} The sorted array.
 *
 * @example:
 *  [2, 9, 5]       => [2, 5, 9]
 *  [2, 9, 5, 9]    => [2, 5, 9, 9]
 *  [-2, 9, 5, -3]  => [-3, -2, 5, 9]
 */
function sortByAsc(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i += 1) {
    if (pivot > arr[i]) {
      left[left.length] = arr[i];
    } else {
      right[right.length] = arr[i];
    }
  }

  return Object.assign(arr, [...sortByAsc(left), pivot, ...sortByAsc(right)]);
}

/**
 * Shuffles characters in a string so that the characters with an odd index are moved to the end of the string at each iteration.
 * Take into account that the string can be very long and the number of iterations is large. Consider how you can optimize your solution.
 * Usage of Array class methods is not allowed in this task.
 *
 * @param {string} str - The string to shuffle.
 * @param {number} iterations - The number of iterations to perform the shuffle.
 * @return {string} The shuffled string.
 *
 * @example:
 *  '012345', 1 => '024135'
 *  'qwerty', 1 => 'qetwry'
 *  '012345', 2 => '024135' => '043215'
 *  'qwerty', 2 => 'qetwry' => 'qtrewy'
 *  '012345', 3 => '024135' => '043215' => '031425'
 *  'qwerty', 3 => 'qetwry' => 'qtrewy' => 'qrwtey'
 */
function shuffleChar(str, iterations) {
  const shuffleOnce = (s) => {
    let end = '';
    let start = '';

    for (let i = 0; i < s.length; i += 1) {
      if (i % 2 !== 0) {
        end += s[i];
      } else {
        start += s[i];
      }
    }

    return start + end;
  };

  let result = str;

  let counter = 1;

  while (counter <= iterations) {
    result = shuffleOnce(result);

    if (result === str) {
      counter = iterations - (iterations % counter) + 1;
    } else {
      counter += 1;
    }
  }

  return result;
}

/**
 * Returns the nearest largest integer consisting of the digits of the given positive integer.
 * If there is no such number, it returns the original number.
 * Usage of String class methods is not allowed in this task.
 *
 * @example:
 * 12345    => 12354
 * 123450   => 123504
 * 12344    => 12434
 * 123440   => 124034
 * 1203450  => 1203504
 * 90822    => 92028
 * 321321   => 322113
 *
 * @param {number} number The source number
 * @returns {number} The nearest larger number, or original number if none exists.
 */
function getNearestBigger(number) {
  const sliceArray = (arr, begin = 0, end = arr.length) => {
    const result = [];

    for (let i = begin; i < end; i += 1) {
      result.push(arr[i]);
    }

    return result;
  };

  const findPivot = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      if (array[i - 1] < array[i]) {
        return i - 1;
      }
    }

    return -1;
  };

  const numberToArray = (num) => {
    const result = [];
    let localNum = num;

    while (localNum > 0) {
      result.push(localNum % 10);

      localNum = Math.trunc(localNum / 10);
    }

    return result.reverse();
  };

  const findMinLarger = (arr, num) => {
    const sortedArr = [...arr].sort((a, b) => a - b);

    const minLarger = sortedArr.find((el) => el > num);

    return minLarger;
  };

  const arrayToNumber = (arr) =>
    arr.reduce((num, digit) => num * 10 + digit, 0);

  const numberArray = numberToArray(number);

  const pivotIndex = findPivot(numberArray);

  if (pivotIndex === -1) {
    return number;
  }

  const leftPart = sliceArray(numberArray, 0, pivotIndex);
  const rightPart = sliceArray(numberArray, pivotIndex, numberArray.length);
  const pivotDigit = rightPart[0];

  const afterPivot = sliceArray(rightPart, 1);

  const minLarger = findMinLarger(afterPivot, pivotDigit);

  const minLargerIndex = afterPivot.findIndex((el) => el === minLarger);

  afterPivot[minLargerIndex] = pivotDigit;

  const resultRightPart = [minLarger, ...[...afterPivot].sort((a, b) => a - b)];

  if (arrayToNumber(resultRightPart) > arrayToNumber(rightPart)) {
    return arrayToNumber([...leftPart, ...resultRightPart]);
  }

  return number;
}

getNearestBigger(123450);

module.exports = {
  isPositive,
  getMaxNumber,
  canQueenCaptureKing,
  isIsoscelesTriangle,
  convertToRomanNumerals,
  convertNumberToString,
  isPalindrome,
  getIndexOf,
  isContainNumber,
  getBalanceIndex,
  getSpiralMatrix,
  rotateMatrix,
  sortByAsc,
  shuffleChar,
  getNearestBigger,
};
