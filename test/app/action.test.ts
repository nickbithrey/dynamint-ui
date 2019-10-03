import * as Actions from 'app/action';
import { DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

describe('App Actions', () => {
    
    test('initConversation action', () => {
        const action = { type: 'type' };
        const dispatch: jest.MockedFunction<any> = jest.fn();
        const actionCreator: ThunkAction<Promise<void>, {}, {}, AnyAction> = Actions.initConversation(action);
        
        expect(dispatch).toHaveBeenCalledTimes(0);
        Promise.resolve(actionCreator(dispatch, null, null));

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: Actions.INIT_CONVERSATION
        });
        expect(dispatch.mock.calls[1][0]).toEqual(action);
    });
    
    test('initSelection action', () => {
        const id = 'id';
        expect(Actions.initSelection(id)).toEqual({
            type: Actions.INIT_SELECTION,
            id: id
        });
    });
    
    test('initDetails action', () => {
        const id = 'id';
        expect(Actions.initDetails(id)).toEqual({
            type: Actions.INIT_DETAILS,
            id: id
        });
    });
    
    test('reloadComponent action', () => {
        const id = 'id';
        expect(Actions.reloadComponent(id)).toEqual({
            type: Actions.RELOAD_COMPONENT,
            id: id
        });
    });
    
    test('loadedComponent action', () => {
        const id = 'id';
        expect(Actions.loadedComponent(id)).toEqual({
            type: Actions.LOADED_COMPONENT,
            id: id
        });
    });
    
    test('updatingComponent action', () => {
        const id = 'id';
        expect(Actions.updatingComponent(id)).toEqual({
            type: Actions.UPDATING_COMPONENT,
            id: id
        });
    });
    
    test('updatedComponent action', () => {
        const id = 'id';
        expect(Actions.updatedComponent(id)).toEqual({
            type: Actions.UPDATED_COMPONENT,
            id: id
        });
    });
    
    test('updateComponentItem action', () => {
        const id = 'id';
        const item = {ref: 'ref'};
        expect(Actions.updateComponentItem(id, item)).toEqual({
            type: Actions.UPDATE_COMPONENT_ITEM,
            id: id,
            result: item
        });
    });
    
    test('pushComponentItem action', () => {
        const id = 'id';
        const item = {ref: 'val'};
        const action = Actions.pushComponentItem(id);
        expect(action.type).toEqual(Actions.PUSH_UPDATE_COMPONENT_ITEM);
        expect(action.pushItem).toEqual(true);
        expect(action.id).toEqual(id);
        
        const actionsAction = action.action('uri', item);
        expect(actionsAction.type).toEqual(Actions.PUSH_UPDATE_ITEM);
        expect(actionsAction.dataRequest).toEqual(true);
        expect(actionsAction.uri).toEqual('uri');
        expect(actionsAction.data).toEqual(item);
        expect(actionsAction.method).toEqual(DataRequestMethod.update);
        expect(actionsAction.notify()).toEqual({
            type: Actions.UPDATING_COMPONENT,
            id: id
        });
        expect(actionsAction.success()).toEqual({
            type: Actions.UPDATED_COMPONENT,
            id: id
        });
        expect(actionsAction.failure()).toEqual({
            type: Actions.UPDATED_COMPONENT,
            id: id
        });
    });
    
    test('pushItem action', () => {
        const id = 'id';
        const item = {ref: 'val'};
        
        const actionsAction = Actions.pushItem(id)('uri', item);
        expect(actionsAction.type).toEqual(Actions.PUSH_UPDATE_ITEM);
        expect(actionsAction.dataRequest).toEqual(true);
        expect(actionsAction.uri).toEqual('uri');
        expect(actionsAction.data).toEqual(item);
        expect(actionsAction.method).toEqual(DataRequestMethod.update);
        expect(actionsAction.notify()).toEqual({
            type: Actions.UPDATING_COMPONENT,
            id: id
        });
        expect(actionsAction.success()).toEqual({
            type: Actions.UPDATED_COMPONENT,
            id: id
        });
        expect(actionsAction.failure()).toEqual({
            type: Actions.UPDATED_COMPONENT,
            id: id
        });
    });
    
    test('clear action', () => {
        const id = 'id';
        expect(Actions.clear(id)).toEqual({
            type: Actions.CLEAR,
            id: id
        });
    });
    
});