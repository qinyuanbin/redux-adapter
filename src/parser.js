/**
 * 解析redux代码模版
 * @param {Object} transition 按照代码模板来写的redux逻辑
 * @param {String} id 同一个redux逻辑，可能需要生成多份数据，比如公共组件，每次创造实例的时候都需要一个注册一个新的reducer
 */
export default function(transition, id) {
    let actions = {};
    let reducers = () => { return {}; };
    const namespace = transition.name;
    const events = transition.events;
    const initialState = transition.initialState || {};
    const capitalizeFirstLetter = word => word.replace(/^./, m => m.toUpperCase());
    const formatActionType = actionName => `${namespace}${capitalizeFirstLetter(actionName)}${id ? '_' + id : ''}`;

    if (events) {
        for (let name in events) {
            actions[name] = function(...args) {
                const actionCreator = events[name].action;
                const action = actionCreator ? actionCreator.apply(this, args) : {};

                return typeof action === 'function'
                    ? action
                    : { type: formatActionType(name), payload: action };
            };
        }

        reducers = (state = {}, action) => {
            // 只处理相同namespace的action
            if (action.type.indexOf(namespace) === 0) {
                for (let name in events) {
                    if (events.hasOwnProperty(name) && action.type === formatActionType(name)) {
                        const reducer = events[name].reducer;
                        const newState = reducer ? reducer(state, action.payload) : {};
                        return { ...initialState, ...state, ...newState };
                    }
                }
            }

            return state;
        };
    }

    return { actions, reducers, initialState };
};
