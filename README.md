# REDUX-ADAPTER
1. spliting and writing actions and reducers into pieces base on components.
2. automatically add and remove reducers of redux store with component lifecycle.
3. no concern of `unique action type`.

### usage
Actions and reducers will organize in this way.
```javascript
// state transitions
export default {
    // initial state
    initialState: {
        tasks: []
    },
    // transition events
    events: {
        addTodo: {
            action(title) {
                const task = { title, done: false };
                return task;
            },
            reducer(state, task) {
                state.tasks.push(task);
                return state;
            }
        }
    }
};
```

### install and coding
install:
```bash
npm i --save redux-adapter
```

first step, init adapter:
```javascript
import { createStore, combineReducers } from 'redux';
import ReduxAdapter from 'redux-adapter';

const initialState = {};
const initialReducers = {};
const store = createStore(
    combineReducers({ ...initialReducers }),
    initialState
);

ReduxAdapter.init(store, initialReducers);

export { store };
```

transitions(`actions` and `reducers`), filename `./todoList.state.js`:
```javascript
export default {
    name: 'todo-list',
    initialState: {
        tasks: []
    },
    events: {
        addTodo: {
            action(title) {
                const task = { title, completed: false };
                return task;
            },
            reducer(state, task) {
                state.tasks.push(task);
                return state;
            }
        }
    }
};
```
wrapped component `./TodoListComponent.jsx`:
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { getState, react as reduxApdapter  } from 'redux-adapter';
import stateTransitions from './todoList.redux';
import { store } from './store';

const mapStateToProp = (state, ownProps) => {
    var currentState = getState(state, ownProps);
    return { tasks: currentState.tasks };
};

@connect(mapStateToProp)
@reduxApdapter(reduxTransitions)
export class TodoListComponent extends Component {
    ...

    addTodo(todo) {
        const { dispatch, actions } = this.props;
        dispatch(actions.addTodo(todo));
    }

    ...
}
```

### Tips

- when coding the the transition, you will never care about the `action.type`, just name your transition and put the `action` and `reducer` in the `events` namespace. reducer will recive what the `action` return in secode argument, first arguement is `state`, just keep same to the redux official.


- it works when `componentDidMount` and destroy when `componentWillUnmount`.

- you can access the state from global state in `mapStateToProp` funciton using 'getState' exported from `redux-adapter`.


- in the wrapped component, `reduxAdapterId` and `actions` will add to `this.props` automatically. `actions` is all the actionCreators you custom in `xxx.redux.js`, you can dispatch it easy, e.g.
```javascript
this.props.dispatch(this.props.actions.addTodo('eating'));
```


- recomment giving a unique `redux-adapter-id` for each component, if you want to save and restore state. Because multiple component at the same time. `ReduxApdater` will find the id in props order in: `redux-adapter-id` -> `id`, if you don't assign this, `redux-adapter` will useing a global auto increasement number for this.
```javascript
<SomeComponentUsingReduxAdapter redux-adapter-id="component-1" />
<SomeComponentUsingReduxAdapter redux-adapter-id="component-2" />
```

---------------------
The MIT License (MIT).

Written by [qinyuanbin](https://github.com/qinyuanbin).
