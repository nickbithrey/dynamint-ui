import * as CompConfigActions from 'model/compconfig/action';
import * as AppActions from 'app/action';
import { DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';
import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

export const LOAD = 'LOAD_COMP_CONFIG';
export const load = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>(() => {
            dispatch( AppActions.initConversation(AppActions.initSelection( 'compConfigSelection' )) )
            dispatch( loadComps );
        } );
    }
}

const loadComps = {
    type: LOAD,
    uri: 'http://localhost:9999/dynamint/api/v1/componentConfigurations',
    dataRequest: true,
    method: DataRequestMethod.get,
    notify: CompConfigActions.loadRequest,
    success: (res: any) => CompConfigActions.loadSuccess(res, 'compConfigSelection'),
    failure: CompConfigActions.loadFailure
};