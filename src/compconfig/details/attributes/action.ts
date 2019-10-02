import * as CompConfigAttrActions from 'model/compconfigattr/action';
import * as AppActions from 'app/action';
import { DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';
import {  AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { ICompConfig } from 'model/compconfig';

export const LOAD = 'LOAD_COMP_CONFIG_ATTRIBUTES';
export const load = (uri: string, entity: ICompConfig): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>(() => {
            dispatch( loadAttrs(uri, entity) );
        } );
    }
}

const loadAttrs = (uri: string, entity: ICompConfig) => ({
    type: LOAD,
    uri: uri,
    dataRequest: true,
    method: DataRequestMethod.get,
    notify: CompConfigAttrActions.loadRequest,
    success: (res: any) => update(res._embedded.componentConfigurationAttributes, entity),
    failure: CompConfigAttrActions.loadFailure
});

export const UPDATE_COMP_CONFIG_ATTRIBUTES = 'UPDATE_COMP_CONFIG_ATTRIBUTES';
export const update = (attributes: any, entity: ICompConfig): AnyAction => {
    return AppActions.updateComponentItem('compConfigDetails', {...entity, attributes: attributes});
}