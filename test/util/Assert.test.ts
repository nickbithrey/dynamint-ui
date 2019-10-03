import * as Assert from 'util/Assert';

describe('Assertions', () => {
    
    test('assertDefined method', () => {
        const message: string = 'error Message';
        expect(Assert.assertDefined('', message)).toBeTruthy();
        expect(() => Assert.assertDefined(null, message)).toThrowError(message);
        expect(() => Assert.assertDefined(undefined, message)).toThrowError(message);
    });
    
    test('assertHasLength method', () => {
        const message: string = 'error Message';
        expect(Assert.assertHasLength([{}], message)).toBeTruthy();
        expect(() => Assert.assertHasLength([], message)).toThrowError(message);
        expect(() => Assert.assertHasLength(null, message)).toThrowError(message);
        expect(() => Assert.assertHasLength(undefined, message)).toThrowError(message);
    });
    
});