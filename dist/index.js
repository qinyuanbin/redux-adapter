'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parser = require('./parser');

Object.keys(_parser).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _parser[key];
        }
    });
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _utils[key];
        }
    });
});

var _adapter = require('./adapter');

Object.keys(_adapter).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _adapter[key];
        }
    });
});

var _consts = require('./consts');

exports.default = {
    /**
     * prepare store with initial reducers
     * @param {object} store
     * @param {object} initialReducers
     */
    init: function init(store, initialReducers) {
        store[_consts.NAME] = {}; // create namespace in store
        (0, _utils.setStore)(store, _consts.INITIAL_REDUCERS, initialReducers);
    }
};