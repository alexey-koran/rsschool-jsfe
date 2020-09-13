module.exports = function transform(arr) {
  if (Array.isArray(arr)) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case '--discard-prev':
          if (result.length !== 0 && arr[i - 2] !== '--discard-next') result.pop();
          break;

        case '--double-prev':
          if (i !== 0 && arr[i - 2] !== '--discard-next') result.push(arr[i - 1]);
          break;

        case '--double-next':
          if (i < arr.length - 1) result.push(arr[i + 1]);
          break;

        case '--discard-next':
          i++;
          break;

        default:
          result.push(arr[i]);
      };
    };

    return result;
  } else {
    throw new Error();
  }
};
