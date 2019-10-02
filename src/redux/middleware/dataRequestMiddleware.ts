import { testDataRequest } from 'service/datarequest';
import { Dispatch, Action } from 'redux';

export enum DataRequestMethod {
    get,
    update,
    delete,
}

export interface IDataRequestAction<T, R> extends Action<string> {
    dataRequest: boolean;
    method: DataRequestMethod;
    uri: string;
    data?: T;
    notify: () => Action;
    success: (res: R) => Action;
    failure: (err: Error) => Action;
}

export default () => (next: Dispatch) => (action: IDataRequestAction<any, any>) => {
    if (!action.dataRequest) {
        return next(action);
    }
    
    // notify that action is in progress
    next(action.notify());
    
    let request;
    switch (action.method) {
        case DataRequestMethod.get:
            request = testDataRequest.get(action.uri);
            break;
        case DataRequestMethod.update:
            request = testDataRequest.update(action.uri, action.data);
            break;
        case DataRequestMethod.delete:
            request = testDataRequest.delete(action.uri);
            break;
        default:
            throw Error('cannot perform action ' + action.method);
    }
    
    request.then(res => {
        return next(action.success(res));
    }).catch(err => {
        return next(action.failure(err));
    });
    
    return next(action);
}