module.exports = class DepthCalculator {
    calculateDepth(arr, result = 1, current = 1) {
        arr.forEach((element) => {
            if (Array.isArray(element)) {
                current++;
                if (current > result) {
                    result++;
                }
                result = Math.max(this.calculateDepth(element, result, current), result);
                current--;
            }
        });
      return result;
    }
};
