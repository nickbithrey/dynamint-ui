import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';

export interface FutureAction extends Action {
    dataRequest: boolean;
    uri: string;
    notify: () => Action;
    success: (result: any) => Action;
    failure: (error: any) => Action;
}

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: FutureAction) => {
    if (!action.dataRequest) {
        return next(action);
    }
    // notify that action is in progress
//    next(action.notify());
    
    next(action.success(data.compConfigs.filter(c => c.uri.includes(action.uri))));
//    if (action.id) {
//        next(action.success(data.compConfigs.filter(c => c.key === action.uri)))
//    } else {
//        next(action.success(data.compConfigs.filter(c => c.key === action.uri)))
//    }
}

const data = {
    compConfigs: [
        {key: 'file', reference: 'FILE_COMP', description: 'Component for file transfers', componentType: 'file', uri: '/comps/file', attributes: {uri: '/details/file/attrs'} },
        {key: 'ftp', reference: 'FTP_COMP', description: 'Component for ftp transfers', componentType: 'ftp', uri: '/comps/ftp', attributes: { uri: '/details/ftp/attrs'} },
        {key: 'fileFile', name: 'file', value: 'f', uri: '/details/file/attrs/file'},
        {key: 'fileMove', name: 'move', value: 'done', uri: '/details/file/attrs/move'},
        {key: 'fileMoveFailed', name: 'moveFailed', value: 'failed', uri: '/details/file/attrs/moveFailed'},
        {key: 'ftpMove', name: 'move', value: 'done', uri: '/details/ftp/attrs/move'}
    ]
}