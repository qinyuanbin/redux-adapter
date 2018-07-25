/**
 * utils for redux actions, reducers and store
 */
import { combineReducers } from 'redux';
import { ADAPTER_ID, INITIAL_REDUCERS, DYNAMIC_REDUCERS, NAME, INITIAL_STATE } from './consts';

const getInitialReducer = store => {
    let reducer = getStore(store, INITIAL_REDUCERS);
    if (!reducer) {
        reducer = setStore(store, INITIAL_REDUCERS, {});
    }
    return reducer;
};

const getDynamicReducer = store => {
    let reducer = getStore(store, DYNAMIC_REDUCERS);;
    if (!reducer) {
        reducer = {};
        setStore(store ,DYNAMIC_REDUCERS, reducer);
    }
    return reducer;
};

const setDynamicReducer = (store, id, reducer) => {
    if (reducer) {
        getDynamicReducer(store)[id] = reducer;
    } else {
        delete getDynamicReducer(store)[id];
    }
};

const updateReducer = store => {
    store.replaceReducer(combineReducers({
        ...getInitialReducer(store),
        ...getDynamicReducer(store)
    }));
};

export function getState(state, props, transitions) {
    return  {
        ...(transitions && transitions[INITIAL_STATE]),
        ...state[props[ADAPTER_ID]]
    };
}

export function getStore(store, key) {
    return store[NAME] && store[NAME][key];
}

export function setStore(store, key, value) {
    store[NAME][key] = value;
}

export function addReducer(store, id, reducer) {
    setDynamicReducer(store, id, reducer);
    updateReducer(store);
}

export function removeReducer(store, id) {
    setDynamicReducer(store, id, null);
    updateReducer(store);
}
