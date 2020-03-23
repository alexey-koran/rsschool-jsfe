module.exports = function toReadable (number) {
  if (number === 0) return 'zero';

  const vocabulary = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred'
  }

  let numberLength = String(number).length;
  let array = String(number).split('');
  let test;
  let testArray = [];
  let newArray = [];
  
  testArray.push(array[1]);
  testArray.push(array[0]);
  test = +testArray.join('');

  for (let i = 0; i < numberLength; i++){
    if (number < 10){
      newArray.push(vocabulary[array[i]]);
      continue;
    }

    if (i === 0) {
      if (number < 10){
        newArray.push(vocabulary[array[i]]);
      }
      if (number < 20) {
        newArray.push(vocabulary[array[i] + array[i + 1]]);
        i++;
        continue;
      }
      if (number < 100) {
        newArray.push(vocabulary[array[i] * 10]);
        continue;
      }
      newArray.push(vocabulary[array[i]] + ' ' + vocabulary[100]);
    }
    if (i === 1) {
      if (array[i] === '0') continue;
      if (number < 100) {
        newArray.push(vocabulary[array[i]]);
        continue;
      }
      if ((test > array[i] * 10) && (test > 10) && (test < 20)){
        newArray.push(vocabulary[array[i] + array[i + 1]]);
        i++;
        continue;
      }
      newArray.push(vocabulary[array[i] * 10]);
    }
    if (i === 2) {
      newArray.push(vocabulary[array[i]]);
    }
  }

  return newArray.join(' ').trim();
}
