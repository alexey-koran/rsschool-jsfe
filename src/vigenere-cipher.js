class VigenereCipheringMachine {
    constructor(Direct) {
      this.Direct = (Direct === false);
    }

    encrypt(str, key) {
      if (!str || !key) throw new Error;

      let offset = 0;
      let result = "";

      key = key.repeat(Math.ceil(str.length / key.length));

      for (let i = 0; i < str.length; i++) {
        const char = this.getChar(str[i], key[i - offset], '+');
        if (!/[a-z]/ig.test(char)) offset++;
        result += char;
      }

      result = this.Direct ? [...result].reverse().join('') : result;

      return result;
    }

    decrypt(str, key) {
      if (!str || !key) throw new Error;

      let offset = 0;
      let result = "";

      key = key.repeat(Math.ceil(str.length / key.length));

      for (let i = 0; i < str.length; i++) {
        const char = this.getChar(str[i], key[i - offset]);
        if (!/[a-z]/ig.test(char)) offset++;
        result += char;
      }

      result = this.Direct ? [...result].reverse().join('') : result;

      return result;
    }

    getChar(x, y, operator) {
      const strChar = x.toUpperCase().codePointAt(0) - 65;
      const keyChar = y.toUpperCase().codePointAt(0) - 65;

      if (strChar < 0 || strChar > 25) {
          return x.toUpperCase();
      }

      let code = operator === '+' ? strChar + keyChar : strChar - keyChar;
      code = code > 25 ? code - 26 : code < 0 ? code + 26 : code;

      return String.fromCodePoint(code + 65);
    }
  }

  module.exports = VigenereCipheringMachine;
