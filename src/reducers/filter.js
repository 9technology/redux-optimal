const noop = require('../_utils/noop');

const filter = (reducer, fn = noop) => {
  const initial = reducer(undefined, {});
  return (state = initial, action) => (
    !fn(action, state) ? state : reducer(state, action)
  );
};

module.exports = filter;
