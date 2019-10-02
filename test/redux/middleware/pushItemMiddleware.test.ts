import middlewareFn, { IPushItemAction } from 'redux/middleware/pushItemMiddleware';
import { MiddlewareAPI, Dispatch } from 'redux';
import State from 'redux/ApplicationState';

describe('push item middleware', () => {
    
    const middleware = middlewareFn;

    it('will not process anything if its not a push item action', () => {
        const action = {
            id: 'id',
            pushItem: false
        }
        const next = jest.fn();
        middleware(null)(next)(action as IPushItemAction);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(action);
    });
    
    it('will call the action correctly for a push item', () => {
        const state = {
            app: {
                id: {
                    item: {
                        _uri: 'uri'
                    }
                }
            }
        };
        const store = {
            getState: () => state
        };
        const result = {
            type: 'result'
        }
        const action = {
            id: 'id',
            type: 'type',
            pushItem: true,
            action: jest.fn().mockReturnValue(result)
        }
        const next = jest.fn();
        
        middleware(store as unknown as MiddlewareAPI<Dispatch, State>)(next)(action);
        
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(result);
        
        expect(action.action).toBeCalledTimes(1);
        expect(action.action).toBeCalledWith(state.app.id.item._uri, state.app.id.item);
    });
    
});