import { INITIAL_REDUCERS } from './src/consts';
import { setStore } from './src/utils';
export * from './src/parser';
export * from './src/utils';
export * from './src/adapter';


export default {
    /**
     * prepare store with initial reducers
     * @param {object} store
     * @param {object} initialReducers
     */
    init: (store, initialReducers) => {
        store[NAME] = {}; // create namespace in store
        setStore(store,  INITIAL_REDUCERS, initialReducers);
    }
};
