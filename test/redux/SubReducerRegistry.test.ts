import { SubReducerRegistry } from 'redux/SubReducerRegistry';
import { ReducerRegistry } from 'redux/reducerRegistry';
import { Reducer } from 'redux';

describe('sub reducer registry', () => {
    
    let parentRegistry: ReducerRegistry;

    let reducerRegistry: SubReducerRegistry;
    
    beforeEach(() => {
        parentRegistry = new ReducerRegistry();
        reducerRegistry = new SubReducerRegistry('key', parentRegistry);
    });
    
    test('register reducer will add to the list', () => {
        const reducer = (state: any, action: any) => state;

        expect(reducerRegistry.getReducers()).toEqual({});
        reducerRegistry.register('test', reducer);
        expect(reducerRegistry.getReducers()).toEqual({test: reducer});
    });
    
    test('registering reducer will not call child change listener', () => {
        const reducer = (state: any, action: any) => state;
        const listener: jest.MockedFunction<any> = jest.fn();
        reducerRegistry.setChangeListener(listener);
        
        expect(listener.mock.calls).toHaveLength(0);
        reducerRegistry.register('test', reducer);
        expect(listener.mock.calls).toHaveLength(0);
    });
    
    test('registering reducer will call parent change listener', () => {
        const reducer = (state: object, action: any) => ({...state});
        const listener: jest.MockedFunction<any> = jest.fn();
        parentRegistry.setChangeListener(listener);
        
        expect(listener.mock.calls).toHaveLength(0);
        reducerRegistry.register('test', reducer);
        expect(listener.mock.calls).toHaveLength(1);
        
        expect(Object.keys(listener.mock.calls[0][0])).toEqual(['key']);
        expect((Object.values(listener.mock.calls[0][0])[0] as Reducer)({test: {}}, {type: 'test'})).toEqual({test: {}});
    });
    
});