const chainMaker = {
  resultArray: [],

  getLength() {
    return this.resultArray.length;
  },

  addLink(value) {
    this.resultArray.push('( ' + value + ' )');
    return this;
  },

  removeLink(position) {
    if (typeof position === 'number' && position > 0 && position <= this.getLength()) {
      this.resultArray.splice(position - 1, 1);
    } else {
      this.resultArray = [];
      throw new Error();
    }
    return this;
  },

  reverseChain() {
    this.resultArray.reverse();
    return this;
  },

  finishChain() {
    let result = this.resultArray;
    this.resultArray = [];
    return result.join('~~');
  }
};

module.exports = chainMaker;
