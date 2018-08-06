const reduce = require('../_utils/reduce');

const include = (middleware, array) => {
  const object = array.reduce(reduce, {});
  return (
    store => next => action => (
      !object[action.type] ?
        next(action) :
        middleware(store)(next)(action)
    )
  );
};

module.exports = include;
