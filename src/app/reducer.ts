import reducerRegistry from 'redux/reducerRegistry';
import * as Action from './action';
import { AppState } from 'redux/ApplicationState';

export default function reducer(state: AppState, action: any) {
    switch (action.type) {
        case Action.INIT_SELECTION:
        case Action.RELOAD_COMPONENT:
            return {...state, [action.id]: { loading: true, updating: false }};
        case Action.INIT_DETAILS:
            return {...state, [action.id]: { loading: true, updating: false, item: {} }};
        case Action.LOADED_COMPONENT:
            return {...state, [action.id]: { ...state[action.id], loading: false }};
        case Action.UPDATING_COMPONENT:
            return {...state, [action.id]: { ...state[action.id], updating: true }};
        case Action.UPDATED_COMPONENT:
            if (!state[action.id]) {
                return {...state};
            }
            return {...state, [action.id]: { ...state[action.id], updating: false }};
        case Action.UPDATE_COMPONENT_ITEM:
            return {...state, [action.id]: { ...action[action.id], item: { ...action.result } }};
        case Action.CLEAR:
            return {...state, [action.id]: undefined};
        default:
            return {...state};
    }
}

reducerRegistry.register('app', reducer);