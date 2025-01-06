/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  ALPHABET_START = 65;
  ALPHABET_SIZE = 26;

  constructor(isDirectMode = true) {
    this.isDirectMode = isDirectMode;
  }

  getChar(x, y, operator) {
    const strChar = x.toUpperCase().charCodeAt(0) - this.ALPHABET_START;
    const keyChar = y.toUpperCase().charCodeAt(0) - this.ALPHABET_START;

    let code = operator === '+' ? strChar + keyChar : strChar - keyChar;

    if (code >= this.ALPHABET_SIZE) {
      code -= this.ALPHABET_SIZE;
    } else if (code < 0) {
      code += this.ALPHABET_SIZE;
    }

    return String.fromCodePoint(code + this.ALPHABET_START);
  }

  process(str, key, operator) {
    if (!str || !key) {
      throw new Error('Incorrect arguments!');
    }

    let offset = 0;
    let result = "";

    const alphabeticalLength = str.replace(/[^a-z]/gi, '').length;
    const newKey = key.repeat(Math.ceil(alphabeticalLength / key.length));

    for (let i = 0; i < str.length; i += 1) {
      const char = str[i];

      if (/[a-z]/i.test(char)) {
        result += this.getChar(char, newKey[i - offset], operator);
      } else {
        result += char;
        offset += 1;
      }
    }

    if (!this.isDirectMode) {
      return result.split('').reverse().join('');
    }

    return result;
  }

  encrypt = (str, key) => this.process(str, key, '+');
  decrypt = (str, key) => this.process(str, key, '-');
}

module.exports = {
  VigenereCipheringMachine
};
