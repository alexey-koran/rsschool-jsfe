module.exports = class DepthCalculator {
  calculateDepth(array) {
    let depth = 1;
    if (array.some(item => Array.isArray(item))){
      let newArray = array.reduce((count, current) => count.concat(current), []);
      return depth + this.calculateDepth(newArray);
    }

    return depth;
  }
};
