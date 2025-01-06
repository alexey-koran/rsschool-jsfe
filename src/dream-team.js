/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
const createDreamTeam = (members) => {
  if (!Array.isArray(members)) {
    return false;
  }

  return members.map((member) => {
    if (typeof member === 'string') {
      return member.trim()[0].toUpperCase();
    }

    return '';

  }).join('');
}

module.exports = {
  createDreamTeam
};
