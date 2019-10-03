import {
    IAdaptor
} from 'service/storage/adaptors';
import LocalStorageAdaptor from 'service/storage/adaptors/LocalStorageAdaptor';

describe('Local Storage Adaptor', () => {

    let adaptor: IAdaptor<string, Object>;

    const state: Object = {key: 'oldval'};
    
    beforeEach(() => {
        adaptor = new LocalStorageAdaptor();
        window.localStorage.setItem('key', JSON.stringify(state));
    });
    
    it('stores to the window local storage', () => {
        adaptor.setItem('key', {key:'val'});
        expect(window.localStorage.getItem('key')).toEqual('{\"key\":\"val\"}');
    });
    
    it('gets items from the local storage', () => {
        const expectedState = {key: 'oldval'};
        expect(adaptor.getItem('key')).toEqual(expectedState);
    });
    
    it('isPresent will return correctly based on the local storage for key being present', () => {
        expect(adaptor.isPresent('key')).toBeTruthy();
        expect(adaptor.isPresent('notkey')).toBeFalsy();
    });
    
    it('will clear the current local storage when calling clear', () => {
        expect(window.localStorage.getItem('key')).not.toBeNull();
        adaptor.clear('key');
        expect(window.localStorage.getItem('key')).toBeNull();
    });

});