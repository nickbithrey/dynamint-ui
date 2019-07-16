import * as CompConfigActions from 'model/compconfig/action';
import * as AppActions from 'app/action';
import { DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { ICompConfig } from 'model/compconfig';
import { COMP_CONFIG_SELECTION_CONVERSATION_KEY } from '../selection';

export const LOAD = 'LOAD_COMP_CONFIG';
export const load = (uri: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>( ( resolve ) => {
            dispatch( AppActions.initDetails( 'compConfigDetails' ) )
            dispatch( loadComp(uri) );
        } );
    }
}

const loadComp = (uri: string) => ({
    type: LOAD,
    uri: uri,
    dataRequest: true,
    method: DataRequestMethod.get,
    notify: CompConfigActions.loadEntityRequest,
    success: (res: any) => loadSuccess(res, 'compConfigDetails'),
    failure: CompConfigActions.loadFailure
});

export const loadSuccess = (result: any, id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>( ( resolve ) => {
            dispatch( AppActions.updateComponentItem(id, result) );
            dispatch( AppActions.loadedComponent(id) );
        } );
    }
}

export const UPDATE = 'UPDATE_COMP_CONFIG';
export const update = (item: ICompConfig): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>( ( resolve ) => {
            dispatch( AppActions.updateComponentItem('compConfigDetails', item) );
            dispatch( AppActions.pushComponentItem('compConfigDetails') );
            dispatch( CompConfigActions.clear() );
            dispatch( AppActions.clear(COMP_CONFIG_SELECTION_CONVERSATION_KEY) );
        } );
    }
}