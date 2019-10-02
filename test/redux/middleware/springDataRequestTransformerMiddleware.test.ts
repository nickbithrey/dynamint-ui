import middlewareFn, { ISpringDataResponseAction } from 'redux/middleware/springDataRequestTransformerMiddleware';

describe('spring data request transformer middleware', () => {
    
    const middleware = middlewareFn;

    it('will not process anything if its not a spring data request without a result', () => {
        const action = {
        }
        const next = jest.fn();
        middleware()(next)(action as ISpringDataResponseAction);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(action);
    });
    
    it('will not process anything if its not a spring data request without a _embedded result', () => {
        const action = {
            result: {
            }
        }
        const next = jest.fn();
        middleware()(next)(action as ISpringDataResponseAction);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(action);
    });
    
    it('will call the action correctly for a push item', () => {
        const action: ISpringDataResponseAction = {
            type: 'type',
            result: {
                _embedded: {
                    key: [{
                        _links: {
                            self: {
                                href: 'href2'
                            }
                        }
                    }]
                },
                _links: {
                    self: {
                        href: 'href1'
                    }
                }
            }
        };
        const result = {
            href2: {
                _links: {
                    self: {
                        href: 'href2'
                    }
                },
                _uri: 'href2'
            }
        };
        const next = jest.fn();
        
        middleware()(next)(action as ISpringDataResponseAction);
        
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(action);
        expect(action.result.key).toEqual(result);
    });
    
});