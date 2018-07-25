'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * utils for redux actions, reducers and store
                                                                                                                                                                                                                                                                   */


exports.getState = getState;
exports.getStore = getStore;
exports.setStore = setStore;
exports.addReducer = addReducer;
exports.removeReducer = removeReducer;

var _redux = require('redux');

var _consts = require('./consts');

var getInitialReducer = function getInitialReducer(store) {
    var reducer = getStore(store, _consts.INITIAL_REDUCERS);
    if (!reducer) {
        reducer = setStore(store, _consts.INITIAL_REDUCERS, {});
    }
    return reducer;
};

var getDynamicReducer = function getDynamicReducer(store) {
    var reducer = getStore(store, _consts.DYNAMIC_REDUCERS);;
    if (!reducer) {
        reducer = {};
        setStore(store, _consts.DYNAMIC_REDUCERS, reducer);
    }
    return reducer;
};

var setDynamicReducer = function setDynamicReducer(store, id, reducer) {
    if (reducer) {
        getDynamicReducer(store)[id] = reducer;
    } else {
        delete getDynamicReducer(store)[id];
    }
};

var updateReducer = function updateReducer(store) {
    store.replaceReducer((0, _redux.combineReducers)(_extends({}, getInitialReducer(store), getDynamicReducer(store))));
};

function getState(state, props, transitions) {
    return _extends({}, transitions && transitions[_consts.INITIAL_STATE], state[props[_consts.ADAPTER_ID]]);
}

function getStore(store, key) {
    return store[_consts.NAME] && store[_consts.NAME][key];
}

function setStore(store, key, value) {
    store[_consts.NAME][key] = value;
}

function addReducer(store, id, reducer) {
    setDynamicReducer(store, id, reducer);
    updateReducer(store);
}

function removeReducer(store, id) {
    setDynamicReducer(store, id, null);
    updateReducer(store);
}