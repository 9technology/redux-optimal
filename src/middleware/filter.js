const noop = require('../_utils/noop');

const filter = (middleware, fn = noop) => (
  store => next => action => (
    !fn(action, store) ?
      next(action) :
      middleware(store)(next)(action)
  )
);

module.exports = filter;
