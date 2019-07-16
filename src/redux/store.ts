import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { combineReducers, ReducersMapObject } from 'redux';
import StorageBuilder from 'service/storage';
import throttle = require('lodash.throttle');
import State from './ApplicationState';
import reducerRegistry from './reducerRegistry';
import dataRequestMiddleware from './middleware/dataRequestMiddleware';
import springDataMiddleware from './middleware/springDataRequestTransformerMiddleware';
import pushItemMiddleware from './middleware/pushItemMiddleware';
import modelReducerRegistry from 'model/modelReducerRegistry';
import appReducer from 'app/reducer';
console.log(modelReducerRegistry);
console.log(appReducer);

const storage = new StorageBuilder<string, State>()
    .withKey('dynamint-ui')
    .withAdaptor('localStorage')
    .withTimeout(300)
    .build();

let initialState: State = storage.getInitialState();
if (!initialState) {
    initialState = {
        app: {},
        model: {}
    }
}

//Preserve initial state for not-yet-loaded reducers
const combine = (reducers: ReducersMapObject) => {
    return combineReducers(reducers);
};

const reducer = (state: State) => initialState ? initialState : {};

const store = createStore(reducer, applyMiddleware(pushItemMiddleware, dataRequestMiddleware, springDataMiddleware, thunkMiddleware, logger));

store.subscribe(throttle(() => {
    storage.store(store.getState() as State)
}, 1000));

reducerRegistry.setChangeListener((reducers: ReducersMapObject) => {
    store.replaceReducer(combine(reducers));
});

export default store;