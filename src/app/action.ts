import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';

export const INIT_CONVERSATION = 'INIT_CONVERSATION';
const newConversation = {
    type: INIT_CONVERSATION
}
export const initConversation = (action: AnyAction): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async ( dispatch: ThunkDispatch<{}, {}, AnyAction> ): Promise<void> => {
        return new Promise<void>(() => {
            dispatch(newConversation)
            dispatch(action);
        } );
    }
}

export const INIT_SELECTION = 'INIT_SELECTION';
export const initSelection = (id: string) => ({
    type: INIT_SELECTION,
    id: id
});

export const INIT_DETAILS = 'INIT_DETAILS';
export const initDetails = (id: string) => ({
    type: INIT_DETAILS,
    id: id
});

export const RELOAD_COMPONENT = 'APP_RELOAD_COMPONENT';
export const reloadComponent = (id: string) => ({
    type: RELOAD_COMPONENT,
    id: id
});

export const LOADED_COMPONENT = 'APP_LOADED_COMPONENT';
export const loadedComponent = (id: string) => ({
    type: LOADED_COMPONENT,
    id: id
});

export const UPDATING_COMPONENT = 'APP_UPDATING_COMPONENT';
export const updatingComponent = (id: string) => ({
    type: UPDATING_COMPONENT,
    id: id
});

export const UPDATED_COMPONENT = 'APP_UPDATED_COMPONENT';
export const updatedComponent = (id: string) => ({
    type: UPDATED_COMPONENT,
    id: id
});

export const UPDATE_COMPONENT_ITEM = 'APP_UPDATE_COMPONENT_ITEM';
export const updateComponentItem = (id: string, item: any) => ({
    type: UPDATE_COMPONENT_ITEM,
    id: id,
    result: item
});

export const PUSH_UPDATE_COMPONENT_ITEM = 'APP_PUSH_UPDATE_COMPONENT_ITEM';
export const pushComponentItem = (id: string) => ({
    type: PUSH_UPDATE_COMPONENT_ITEM,
    id: id,
    pushItem: true,
    action: pushItem(id)
});

export const PUSH_UPDATE_ITEM = 'APP_PUSH_UPDATE_ITEM';
export const pushItem = (id: string) => (
    (uri: string, item: any) => ({
        type: PUSH_UPDATE_ITEM,
        dataRequest: true,
        uri: uri,
        data: item,
        method: DataRequestMethod.update,
        notify: () => updatingComponent(id),
        success: () => updatedComponent(id),
        failure: () => updatedComponent(id)
    })
);

export const CLEAR = 'APP_CLEAR';
export const clear = (id: string) => ({
    type: CLEAR,
    id: id
});