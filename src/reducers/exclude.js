const reduce = require('../_utils/reduce');

const exclude = (reducer, array = []) => {
  const object = array.reduce(reduce, {});
  const initial = reducer(undefined, {});
  return (state = initial, action) => (
    object[action.type] ? state : reducer(state, action)
  );
};

module.exports = exclude;
