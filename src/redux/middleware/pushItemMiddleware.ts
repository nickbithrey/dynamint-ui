import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import State, { AppDetailsState } from '../ApplicationState';

export interface IPushItemAction extends AnyAction {
    pushItem: boolean;
    id: string;
    action: (uri: string, item: any) => AnyAction
}

/**
 *  converts a push item request to an actual request for pushing the item to an external system. 
 *  This is simply extracting the item from the details component and updating it accordingly. 
 *  Note: this will be skipped if "pushItem" field on the action is not true
 */
export default (store: MiddlewareAPI<Dispatch, State>) => (next: Dispatch) => (action: IPushItemAction) => {
    if (!action.pushItem) {
        return next(action);
    }
    const detailsState = store.getState().app[action.id] as AppDetailsState;
    const uri = detailsState.item._uri;
    return next(action.action(uri, detailsState.item));
}