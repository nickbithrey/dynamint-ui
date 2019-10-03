import reducerRegistry from 'redux/reducerRegistry';
import { SubReducerRegistry } from 'redux/SubReducerRegistry';

const modelReducerRegistry = new SubReducerRegistry('model', reducerRegistry);

export default modelReducerRegistry;