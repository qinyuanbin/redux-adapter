'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 解析redux代码模版
                                                                                                                                                                                                                                                                   * @param {Object} transition 按照代码模板来写的redux逻辑
                                                                                                                                                                                                                                                                   * @param {String} id 同一个redux逻辑，可能需要生成多份数据，比如公共组件，每次创造实例的时候都需要一个注册一个新的reducer
                                                                                                                                                                                                                                                                   */


exports.default = function (transition, id) {
    var actions = {};
    var reducers = function reducers() {
        return {};
    };
    var namespace = transition.name;
    var events = transition.events;
    var initialState = transition.initialState || {};
    var capitalizeFirstLetter = function capitalizeFirstLetter(word) {
        return word.replace(/^./, function (m) {
            return m.toUpperCase();
        });
    };
    var formatActionType = function formatActionType(actionName) {
        return '' + namespace + capitalizeFirstLetter(actionName) + (id ? '_' + id : '');
    };

    if (events) {
        var _loop = function _loop(name) {
            actions[name] = function () {
                var actionCreator = events[name].action;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var action = actionCreator ? actionCreator.apply(this, args) : {};

                return typeof action === 'function' ? action : { type: formatActionType(name), payload: action };
            };
        };

        for (var name in events) {
            _loop(name);
        }

        reducers = function reducers() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var action = arguments[1];

            // 只处理相同namespace的action
            if (action.type.indexOf(namespace) === 0) {
                for (var name in events) {
                    if (events.hasOwnProperty(name) && action.type === formatActionType(name)) {
                        var reducer = events[name].reducer;
                        var newState = reducer ? reducer(state, action.payload) : {};
                        return _extends({}, initialState, state, newState);
                    }
                }
            }

            return state;
        };
    }

    return { actions: actions, reducers: reducers, initialState: initialState };
};

;