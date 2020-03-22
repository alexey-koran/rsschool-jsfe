const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  if (typeof(sampleActivity) == 'string' && parseFloat(sampleActivity) > 0 && parseFloat(sampleActivity) <= 15) {
    let k = 0.693 / HALF_LIFE_PERIOD;
    return Math.ceil((Math.log(MODERN_ACTIVITY / parseFloat(sampleActivity))) / k);
  }
  else {
    return false;
  }
};
