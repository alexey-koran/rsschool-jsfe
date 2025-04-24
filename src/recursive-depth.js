/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates depth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(array) {
    const depth = 1;

    if (array.some(item => Array.isArray(item))){
      const newArray = array.reduce((count, current) => count.concat(current), []);

      return depth + this.calculateDepth(newArray);
    }

    return depth;
  }
}

module.exports = {
  depthCalculator: new DepthCalculator(),
};
