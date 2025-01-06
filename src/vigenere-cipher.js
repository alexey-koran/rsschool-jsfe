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
  constructor(Direct) {
    this.Direct = Direct === true;
  }

  encrypt(str, key) {
    if (!str || !key) {
      throw new Error('Incorrect arguments!');
    }

    let offset = 0;
    let result = "";

    const newKey = key.repeat(Math.ceil(str.length / key.length));

    for (let i = 0; i < str.length; i += 1) {
      const char = this.getChar(str[i], newKey[i - offset], '+');

      if (!/[a-z]/ig.test(char)) {
        offset += 1;
      }

      result += char;
    }

    if (!this.Direct) {
      return [...result].reverse().join('');
    }

    return result;
  }

  decrypt(str, key) {
    if (!str || !key) {
      throw new Error('Incorrect arguments!');
    }

    let offset = 0;
    let result = "";

    const newKey = key.repeat(Math.ceil(str.length / key.length));

    for (let i = 0; i < str.length; i += 1) {
      const char = this.getChar(str[i], newKey[i - offset]);

      if (!/[a-z]/ig.test(char)) {
        offset += 1;
      }

      result += char;
    }

    if (!this.Direct) {
      return [...result].reverse().join('');
    }

    return result;
  }

  getChar(x, y, operator) {
    const strChar = x.toUpperCase().codePointAt(0) - 65;
    const keyChar = y.toUpperCase().codePointAt(0) - 65;

    if (strChar < 0 || strChar > 25) {
      return x.toUpperCase();
    }

    let code = operator === '+' ? strChar + keyChar : strChar - keyChar;

    if (code > 25) {
      code = code - 26;
    } else if (code < 0) {
      code = code + 26;
    }

    return String.fromCodePoint(code + 65);
  }
}

module.exports = {
  VigenereCipheringMachine
};
