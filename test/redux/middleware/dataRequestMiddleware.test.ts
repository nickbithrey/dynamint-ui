import middlewareFn, { IDataRequestAction, DataRequestMethod } from 'redux/middleware/dataRequestMiddleware';
import { IDataRequest } from 'service/datarequest';

describe('data request middleware', () => {
    
    const testDataRequest: IDataRequest = {
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
    
    const middleware = middlewareFn(testDataRequest);

    beforeEach(() => {
        (testDataRequest.get as jest.MockedFunction<any>).mockReset();
        (testDataRequest.update as jest.MockedFunction<any>).mockReset();
        (testDataRequest.delete as jest.MockedFunction<any>).mockReset();
    })
    
    it('will not process anything if its not a data request', () => {
        const action = {
            dataRequest: false
        };
        const next = jest.fn();
        middleware()(next)(action as IDataRequestAction<any,any>);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(action);
    });
    
    it('will throw exception if method is not found', () => {
        const notifyResult = {type: 'notify'};
        const action = {
            dataRequest: true,
            method: 'invalid',
            notify: jest.fn().mockReturnValue(notifyResult)
        };
        const next = jest.fn();
        expect(() => middleware()(next)(action as unknown as IDataRequestAction<any,any>)).toThrowError('cannot perform action invalid');
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(notifyResult);
        
        expect(action.notify).toBeCalledTimes(1);
        expect(action.notify).toBeCalledWith();
    });
    
    it('will call get method in test data request for get action', async () => {
        const notifyResult = {type: 'notify'};
        const successResult = {type: 'success'};
        const action = {
            dataRequest: true,
            type: 'type',
            method: DataRequestMethod.get,
            uri: 'uri',
            notify: jest.fn().mockReturnValue(notifyResult),
            success: jest.fn().mockReturnValue(successResult),
            failure: jest.fn()
        };
        
        const notify: jest.MockedFunction<any> = action.notify;
        const success: jest.MockedFunction<any> = action.success;
        const next = jest.fn();
        const getFn: jest.MockedFunction<any> = testDataRequest.get;
        const result = 'get';
        getFn.mockReturnValue(new Promise(res => res(result)));
        expect(getFn).not.toBeCalled();
        
        await middleware()(next)(action);
        
        expect(next).toBeCalledTimes(2);
        expect(next.mock.calls[0][0]).toBe(notifyResult)
        expect(next.mock.calls[1][0]).toEqual(successResult);
        
        expect(getFn).toBeCalledTimes(1);
        expect(getFn).toBeCalledWith(action.uri);
        const updateFn: jest.MockedFunction<any> = testDataRequest.update;
        expect(updateFn).not.toBeCalled()
        const deleteFn: jest.MockedFunction<any> = testDataRequest.delete;
        expect(deleteFn).not.toBeCalled()
        
        expect(notify).toBeCalledTimes(1);
        expect(notify).toBeCalledWith();
        
        expect(success).toBeCalledTimes(1);
        expect(success).toBeCalledWith(result);

        const failure: jest.MockedFunction<any> = action.failure;
        expect(failure).not.toBeCalled();
    });
    
    it('will call update method in test data request for update action', async () => {
        const notifyResult = {type: 'notify'};
        const successResult = {type: 'success'};
        const data = {name: 'value'};
        const action = {
            dataRequest: true,
            type: 'type',
            method: DataRequestMethod.update,
            uri: 'uri',
            data: data,
            notify: jest.fn().mockReturnValue(notifyResult),
            success: jest.fn().mockReturnValue(successResult),
            failure: jest.fn()
        };
        
        const notify: jest.MockedFunction<any> = action.notify;
        const success: jest.MockedFunction<any> = action.success;
        const next = jest.fn();
        const updateFn: jest.MockedFunction<any> = testDataRequest.update;
        const result = 'update';
        updateFn.mockReturnValue(new Promise(res => res(result)));
        expect(updateFn).not.toBeCalled();
        
        await middleware()(next)(action);
        
        expect(next).toBeCalledTimes(2);
        expect(next.mock.calls[0][0]).toBe(notifyResult)
        expect(next.mock.calls[1][0]).toEqual(successResult);
        
        expect(updateFn).toBeCalledTimes(1);
        expect(updateFn).toBeCalledWith(action.uri, action.data);
        const getFn: jest.MockedFunction<any> = testDataRequest.get;
        expect(getFn).not.toBeCalled()
        const deleteFn: jest.MockedFunction<any> = testDataRequest.delete;
        expect(deleteFn).not.toBeCalled()
        
        expect(notify).toBeCalledTimes(1);
        expect(notify).toBeCalledWith();
        
        expect(success).toBeCalledTimes(1);
        expect(success).toBeCalledWith(result);

        const failure: jest.MockedFunction<any> = action.failure;
        expect(failure).not.toBeCalled();
    });
    
    it('will call delete method in test data request for delete action', async () => {
        const notifyResult = {type: 'notify'};
        const successResult = {type: 'success'};
        const action = {
            dataRequest: true,
            type: 'type',
            method: DataRequestMethod.delete,
            uri: 'uri',
            notify: jest.fn().mockReturnValue(notifyResult),
            success: jest.fn().mockReturnValue(successResult),
            failure: jest.fn()
        };
        
        const notify: jest.MockedFunction<any> = action.notify;
        const success: jest.MockedFunction<any> = action.success;
        const next = jest.fn();
        const deleteFn: jest.MockedFunction<any> = testDataRequest.delete;
        const result = 'delete';
        deleteFn.mockReturnValue(new Promise(res => res(result)));
        expect(deleteFn).not.toBeCalled();
        
        await middleware()(next)(action);
        
        expect(next).toBeCalledTimes(2);
        expect(next.mock.calls[0][0]).toBe(notifyResult)
        expect(next.mock.calls[1][0]).toEqual(successResult);
        
        expect(deleteFn).toBeCalledTimes(1);
        expect(deleteFn).toBeCalledWith(action.uri);
        const updateFn: jest.MockedFunction<any> = testDataRequest.update;
        expect(updateFn).not.toBeCalled()
        const getFn: jest.MockedFunction<any> = testDataRequest.get;
        expect(getFn).not.toBeCalled()
        
        expect(notify).toBeCalledTimes(1);
        expect(notify).toBeCalledWith();
        
        expect(success).toBeCalledTimes(1);
        expect(success).toBeCalledWith(result);

        const failure: jest.MockedFunction<any> = action.failure;
        expect(failure).not.toBeCalled();
    });
    
    it('will call failure action for failed request', async () => {
        const notifyResult = {type: 'notify'};
        const failureResult = {type: 'failure'};
        const action = {
            dataRequest: true,
            type: 'type',
            method: DataRequestMethod.delete,
            uri: 'uri',
            notify: jest.fn().mockReturnValue(notifyResult),
            success: jest.fn(),
            failure: jest.fn().mockReturnValue(failureResult)
        };
        
        const notify: jest.MockedFunction<any> = action.notify;
        const failure: jest.MockedFunction<any> = action.failure;
        const next = jest.fn();
        const deleteFn: jest.MockedFunction<any> = testDataRequest.delete;
        const result = Error('error');
        deleteFn.mockReturnValue(new Promise((res,rej) => rej(result)));
        expect(deleteFn).not.toBeCalled();
        
        await middleware()(next)(action);
        
        expect(next).toBeCalledTimes(2);
        expect(next.mock.calls[0][0]).toBe(notifyResult)
        expect(next.mock.calls[1][0]).toEqual(failureResult);
        
        expect(deleteFn).toBeCalledTimes(1);
        expect(deleteFn).toBeCalledWith(action.uri);
        const updateFn: jest.MockedFunction<any> = testDataRequest.update;
        expect(updateFn).not.toBeCalled()
        const getFn: jest.MockedFunction<any> = testDataRequest.get;
        expect(getFn).not.toBeCalled()
        
        expect(notify).toBeCalledTimes(1);
        expect(notify).toBeCalledWith();
        
        expect(failure).toBeCalledTimes(1);
        expect(failure).toBeCalledWith(result);
        
        const success: jest.MockedFunction<any> = action.success;
        expect(success).not.toBeCalled();
    });
    
});