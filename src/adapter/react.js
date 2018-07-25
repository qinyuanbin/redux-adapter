import React, { Component } from 'react';
import { object } from 'prop-types';
import parse from '../parser';
import { addReducer, removeReducer } from '../..';
import { ADAPTER_ID } from '../consts';

export default function(reduxTransitions) {
    return function(UiComponent) {
        class WrappedComponent extends Component {
            static id = 0;
            static contextTypes = {
                store: object
            };

            constructor(props, context) {
                super(props, context);
                const id = this.props[ADAPTER_ID] || this.props.id || WrappedComponent.id++
                reduxTransitions.name = WrappedComponent.displayName;
                this[ADAPTER_ID] = id;
                this.transitions = parse(reduxTransitions, id);
            }

            getAdapterId() {
                return this[ADAPTER_ID];
            }

            componentDidMount() {
                addReducer(this.context.store, getAdapterId(), this.transitions.reducers);
            }

            componentWillUnmount() {
                removeReducer(this.context.store, getAdapterId());
            }

            render() {
                const uiProps = {
                    ...this.props,
                    actions: this.transitions.actions,
                    [ADAPTER_ID]: getAdapterId()
                };

                return <UiComponent {...uiProps}/>;
            }
        }

        WrappedComponent.displayName = `ReduxAdapter(${getDisplayName(UiComponent)})`;

        return WrappedComponent;
    };
}

function getDisplayName(UiComponent) {
    return UiComponent.displayName || UiComponent.name || 'Component';
}
