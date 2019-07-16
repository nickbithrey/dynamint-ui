import reducerRegistry from '../modelReducerRegistry';
import * as Action from './action';
import {
    ICompConfigState,
    ICompConfigAction,
    ICompConfig
} from './';

export default function reducer(state: ICompConfigState, action: ICompConfigAction) {
    switch (action.type) {
        case Action.LOAD_REQUEST:
            return {};
        case Action.LOAD_SUCCESS:
            const result: {
                componentConfigurations: ICompConfig;
            } = {...action.result};
            return result.componentConfigurations;
        case Action.CLEAR:
            return {};
        default:
            return {...state};
    }
}

reducerRegistry.register('compConfig', reducer);