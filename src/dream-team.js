module.exports = function createDreamTeam(members) {
  if (Array.isArray(members)) {
    return members.map((item) => {
      if (typeof item == 'string') return item.trim()[0].toUpperCase();
    }).sort().join('');
  } else {
    return false;
  }
};
