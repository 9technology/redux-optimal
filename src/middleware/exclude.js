const reduce = require('../_utils/reduce');

const exclude = (middleware, array) => {
  const object = array.reduce(reduce, {});
  return (
    store => next => action => (
      object[action.type] ?
        next(action) :
        middleware(store)(next)(action)
    )
  );
};

module.exports = exclude;
