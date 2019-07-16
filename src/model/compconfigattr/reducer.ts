import reducerRegistry from '../modelReducerRegistry';
import * as Action from './action';
import {
    ICompConfigAttributeState,
    ICompConfigAttributeAction,
    ICompConfigAttribute
} from './';

export default function reducer(state: ICompConfigAttributeState, action: ICompConfigAttributeAction) {
    switch (action.type) {
        case Action.LOAD_REQUEST:
            return {};
        case Action.LOAD_SUCCESS:
            const result: {
                componentConfigurationAttributes: Array<ICompConfigAttribute>;
            } = {...action.result};
            return result.componentConfigurationAttributes;
        case Action.CLEAR:
            return {};
        default:
            return {...state};
    }
}

reducerRegistry.register('compConfigAttr', reducer);