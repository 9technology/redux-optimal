const reduce = require('../_utils/reduce');

const include = (reducer, array = []) => {
  const object = array.reduce(reduce, {});
  const initial = reducer(undefined, {});
  return (state = initial, action) => (
    !object[action.type] ? state : reducer(state, action)
  );
};

module.exports = include;
