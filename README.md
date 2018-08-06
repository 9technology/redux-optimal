# Redux Optimal

Redux Optimal is a tool to assist in the optimisation of redux across reducers and middleware. The syntax is simple and designed for easy usage.

## Installation

### Requirements
* react-redux
* babel

`$ npm install --save redux-optimal`

## About

### Background:

Reducers are comprised of the following standard syntax:

```node-js

import { SOME_ACTION_TYPE } from '../actions/some';

const someReducer = (state, action) {
  switch(action.type) {
    case SOME_ACTION_TYPE:
     return {
        ...state,
        value: action.value
     }
    default: return state
  }
}

export default someReducer;

```

Whereas middleware is usually comprised of the following code:

```node-js

import { SOME_ACTION_TYPE } from '../actions/some';

const someMiddleware = store => next => (action) {
  if (action.type === SOME_ACTION_TYPE) {
    console.log(action.value)
  }
  return next(action);
}

export default reducer;

```

This implementation is fine and in most cases is optimal enough that it does not need any further adjustment. However, in large systems where multiple reducers are used, it can become a heavy burden to execute each reducer and middleware function upon each action request. This can become especially prevalent in environments such as react-native on lower-memory devices when triggering multiple requests simultaneously.

### Why Redux Optimal

Redux Optimal provides a simple interception function that returns early based on the given criteria.

There are other solutions available, however Redux Optimal offers an **o(1)** efficiency for **both** middleware and reducers when determining whether to execute the respective functions when using the inclusion and exclusion wrapper methods, as well as a custom function for more complex use cases.

The o(1) efficiency is created by building an object upon initial execution of the wrapper function that can then be key value checked during the execution phase of the redux action request.

## Usage

Both middleware and reducer functions have the same paradigm patterns:

* Include
* Exclude
* Filter

### Include

Include is an action type system (based on the action types being strings). Using the examples above, the wrapper functions can be included as below:


```node-js
// Reducer Example

import { reducers } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const only = [
  SOME_ACTION_TYPE,
];

const someReducer = ... // Same function as above

export default reducers.include(someReducer, only);

```

```node-js
// Middleware Example

import { middleware } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const only = [
  SOME_ACTION_TYPE,
];

const someMiddleware = ... // Same function as above

export default middleware.include(someReducer, only);

```
The resulting code will only trigger the middleware or reducer when the action type is equal to SOME_ACTION_TYPE. Multiple actions can be included in the array with the same level of efficiency (the only cost being the initial setup of the object.)

### Exclude

Exclude is an action type system (based on the action types being strings). Using the examples above, the wrapper functions can be included as below:


```node-js
// Reducer Example

import { reducers } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const not = [
  SOME_ACTION_TYPE,
];

const otherReducer = ... // Different function from above

export default reducers.exclude(otherReducer, not);

```

```node-js
// Middleware Example

import { middleware } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const not = [
  SOME_ACTION_TYPE,
];

const otherMiddleware = ... // Different function from above

export default middleware.exclude(otherMiddleware, not);

```
The resulting code will trigger the middleware or reducer when the action type is an action that is not included in the supplied array. Again, multiple actions can be included in the array with the same level of efficiency (the only cost being the initial setup of the object.)

### Filter

Sometimes there are more complex requirements for whether or not to return early from either reducers or middleware. Example use cases:

* The action type starts with a certain prefix
* The state object has a certain value
* The action contains a certain value
* A global event prevents the action
* etc

In these cases, the Filter function allows an easy system to determine whether a redux reducer or middleware function should return early.

```node-js
// Reducer Example

import { reducers } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const fn = (action, state) => ... // do something with the action or the state to determine early return

const someReducer = ... // Same function as above

export default reducers.filter(someReducer, fn);

```

```node-js
// Middleware Example

import { middleware } from 'redux-optimal';
import { SOME_ACTION_TYPE } from '../actions/some';

const fn = (action, store) => ... // do something with the action or the state to determine early return

const someMiddleware = ... // Same function as above

export default middleware.filter(someMiddleware, fn);

```
As can be seen in the above examples, the function signatures are slightly different for reducers and middleware, with the middleware passing the action and store, whilst the reducer passes the action and state.

## License
[MIT](https://choosealicense.com/licenses/mit/)
