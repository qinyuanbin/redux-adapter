import { INITIAL_REDUCERS, NAME } from './consts';
import { setStore } from './utils';

export * from './parser';
export * from './utils';
export * from './adapter';

export default {
    /**
     * prepare store with initial reducers
     * @param {object} store
     * @param {object} initialReducers
     */
    init: (store, initialReducers) => {
        store[NAME] = {}; // create namespace in store
        setStore(store, INITIAL_REDUCERS, initialReducers);
    }
};
