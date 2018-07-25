import React, { Component } from 'react';
import { object } from 'prop-types';
import parse from '../parser';
import { addReducer, removeReducer } from '../utils';
import { ADAPTER_ID, INITIAL_STATE } from '../consts';

export function react(reduxTransitions) {
    return function(UiComponent) {
        class WrappedComponent extends Component {
            static id = 0;
            static contextTypes = {
                store: object
            };

            constructor(props, context) {
                super(props, context);
                const id = this.props[ADAPTER_ID] || WrappedComponent.id++;
                const apapterId =  `${WrappedComponent.displayName}(${id})`;
                this[ADAPTER_ID] = apapterId;
                this.transitions = parse(reduxTransitions, apapterId);
            }

            getAdapterId() {
                return this.props[ADAPTER_ID];
            }

            UNSAFE_componentWillMount() {
                addReducer(this.context.store, this.getAdapterId(), this.transitions.reducer);
            }

            componentWillUnmount() {
                removeReducer(this.context.store, this.getAdapterId());
            }

            render() {
                const uiProps = {
                    ...this.props,
                    actions: this.transitions.actions,
                    [ADAPTER_ID]: this.getAdapterId(),
                    [INITIAL_STATE]: this.transitions.initialState
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
