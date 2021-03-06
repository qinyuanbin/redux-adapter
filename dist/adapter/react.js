'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.react = react;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _utils = require('../utils');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function react(reduxTransitions) {
    return function (UiComponent) {
        var WrappedComponent = function (_Component) {
            _inherits(WrappedComponent, _Component);

            function WrappedComponent(props, context) {
                _classCallCheck(this, WrappedComponent);

                var _this = _possibleConstructorReturn(this, (WrappedComponent.__proto__ || Object.getPrototypeOf(WrappedComponent)).call(this, props, context));

                var id = _this.props[_consts.ADAPTER_ID] || WrappedComponent.id++;
                var apapterId = WrappedComponent.displayName + '(' + id + ')';
                _this[_consts.ADAPTER_ID] = apapterId;
                _this.transitions = (0, _parser2.default)(reduxTransitions, apapterId);
                return _this;
            }

            _createClass(WrappedComponent, [{
                key: 'getAdapterId',
                value: function getAdapterId() {
                    return this.props[_consts.ADAPTER_ID];
                }
            }, {
                key: 'UNSAFE_componentWillMount',
                value: function UNSAFE_componentWillMount() {
                    (0, _utils.addReducer)(this.context.store, this.getAdapterId(), this.transitions.reducer);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    (0, _utils.removeReducer)(this.context.store, this.getAdapterId());
                }
            }, {
                key: 'render',
                value: function render() {
                    var _extends2;

                    var uiProps = _extends({}, this.props, (_extends2 = {
                        actions: this.transitions.actions
                    }, _defineProperty(_extends2, _consts.ADAPTER_ID, this.getAdapterId()), _defineProperty(_extends2, _consts.INITIAL_STATE, this.transitions.initialState), _extends2));

                    return _react2.default.createElement(UiComponent, uiProps);
                }
            }]);

            return WrappedComponent;
        }(_react.Component);

        WrappedComponent.id = 0;
        WrappedComponent.contextTypes = {
            store: _propTypes.object
        };


        WrappedComponent.displayName = 'ReduxAdapter(' + getDisplayName(UiComponent) + ')';

        return WrappedComponent;
    };
}

function getDisplayName(UiComponent) {
    return UiComponent.displayName || UiComponent.name || 'Component';
}