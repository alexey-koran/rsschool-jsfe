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
    this.resultArray.push('( ' + value + ' )');

    return this;
  },

  removeLink(position) {
    if (typeof position !== 'number' || position <= 0 || position > this.getLength()) {
      throw new Error();
    }

    this.resultArray.splice(position - 1, 1);

    return this;
  },

  reverseChain() {
    this.resultArray.reverse();

    return this;
  },

  finishChain() {
    const result = this.resultArray;

    this.resultArray = [];

    return result.join(this.chainMarker);
  }
};

module.exports = {
  chainMaker
};
