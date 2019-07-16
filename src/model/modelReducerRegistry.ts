import reducerRegistry from 'redux/reducerRegistry';
import { SubReducerRegistry } from 'redux/SubReducerRegistry';
import { ReducersMapObject, Reducer, combineReducers } from 'redux';

const modelReducerRegistry = new SubReducerRegistry('model', reducerRegistry);

export default modelReducerRegistry;