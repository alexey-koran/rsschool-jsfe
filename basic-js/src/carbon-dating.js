const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
const dateSample = (sampleActivity) => {
  if (typeof sampleActivity !== 'string') {
    return false;
  }

  const activity = parseFloat(sampleActivity);

  if (activity > 0 && activity <= 15) {
    const decayRate = Math.LN2 / HALF_LIFE_PERIOD;

    const age = Math.ceil((Math.log(MODERN_ACTIVITY / activity)) / decayRate)

    return age;
  }

  return false;
}

module.exports = {
  dateSample
};
