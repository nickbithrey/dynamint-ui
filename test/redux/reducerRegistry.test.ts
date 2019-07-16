import { ReducerRegistry } from 'redux/reducerRegistry';

describe('reducer registry', () => {
    
    let reducerRegistry: ReducerRegistry;
    
    beforeEach(() => {
        reducerRegistry = new ReducerRegistry();
    });
    
    test('register reducer will add to the list', () => {
        const reducer = (state: any, action: any) => state;

        expect(reducerRegistry.getReducers()).toEqual({});
        reducerRegistry.register('test', reducer);
        expect(reducerRegistry.getReducers()).toEqual({test: reducer});
    });
    
    test('registering reducer will call change listener', () => {
        const reducer = (state: any, action: any) => state;
        const listener: jest.MockedFunction<any> = jest.fn();
        reducerRegistry.setChangeListener(listener);
        
        expect(listener.mock.calls).toHaveLength(0);
        reducerRegistry.register('test', reducer);
        expect(listener.mock.calls).toHaveLength(1);
        expect(listener.mock.calls[0][0]).toEqual({test: reducer});
    });
    
});