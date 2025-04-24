/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chainMarker: '~~',
  resultArray: [],

  getLength() {
    return this.resultArray.length;
  },

  addLink(value) {
    const newObject = {...this};

    newObject.resultArray = [...newObject.resultArray, '( ' + value + ' )'];

    return newObject;
  },

  removeLink(position) {
    if (typeof position !== 'number' || position <= 0 || position > this.getLength()) {
      throw new Error('You can\'t remove incorrect link!');
    }

    const newObject = {...this};

    newObject.resultArray = newObject.resultArray.filter((_value, index) => index + 1 !== position);

    return newObject;
  },

  reverseChain() {
    const newObject = {...this};

    newObject.resultArray = [...newObject.resultArray].reverse();

    return newObject;
  },

  finishChain() {
    const result = this.resultArray;

    this.resultArray = [];

    return result.join(this.chainMarker);
  }
};

module.exports = {
  chainMaker,
};
