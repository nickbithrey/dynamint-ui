import reducer from './reducer';
import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import * as AppActions from 'app/action';
console.log(reducer.name);

export const LOAD_REQUEST = 'LOAD_COMP_CONFIG_ATTRIBUTES_REQUEST';
export const loadRequest = () => (
    {
        type: LOAD_REQUEST
    }
);

export const LOAD_SUCCESS = 'LOAD_COMP_CONFIG_ATTRIBUTES_SUCCESS';
export const loadConfigCompSuccess = (result: any) => (
    {
        type: LOAD_SUCCESS,
        id: 'compConfigAttr',
        result: result
    }
);

export const loadSuccess = (result: any, id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>(() => {
            dispatch( loadConfigCompSuccess(result) );
            dispatch( AppActions.loadedComponent(id) );
        });
    }
}

export const LOAD_FAILURE = 'LOAD_COMP_CONFIG_ATTRIBUTES_FAILURE';
export const loadFailure = (error: any) => (
    {
        type: LOAD_FAILURE,
        error: error
    }
);

export const LOAD_ENTITY_REQUEST = 'LOAD_COMP_CONFIG_ATTRIBUTE_REQUEST';
export const loadEntityRequest = () => (
    {
        type: LOAD_ENTITY_REQUEST
    }
);

export const CLEAR = 'CLEAR_COMP_CONFIG_ATTRIBUTES';
export const clear = () => (
    {
        type: CLEAR
    }
);