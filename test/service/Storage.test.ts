import StorageBuilder, { Storage } from 'service/storage';
import adaptors, { IAdaptor } from 'service/storage/adaptors';
import LocalStorageAdaptor from 'service/storage/adaptors/LocalStorageAdaptor';

describe('Storage Builder', () => {

    let adaptor: IAdaptor<string, Object> & ITestAdaptor;
    
    let storage: Storage<string, Object>;

    beforeEach(() => {
        adaptor = new TestAdaptor();
        storage = new StorageBuilder<string, Object>()
            .withKey('key')
            .withOverrideAdaptor(adaptor)
            .withTimeout(400)
            .build();
        
        // create test adaptor with mock functions
        adaptors.testAdaptor = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            isPresent: jest.fn(),
            clear: jest.fn()
        };
    });
    
    afterEach(() => {
        // delete test adaptor
        delete adaptors.testAdaptor;
    });
    
    it('builds the storage class with the correct details', () => {
        expect(storage.key).toEqual('key');
        expect(storage.adaptor).toEqual(adaptor);
        expect(storage.timeout).toEqual(400);
    });
    
    it('uses the defaults if not set', () => {
        const defaultsStorage = new StorageBuilder<string, Object>()
            .withKey('key')
            .build();
        expect(defaultsStorage.adaptor).toBeInstanceOf(LocalStorageAdaptor);
        expect(defaultsStorage.timeout).toEqual(300);
    });
    
    it('stores to the adaptor', () => {
        const state = {};
        storage.store(state);
        expect(adaptor.getStore()).toEqual(state);
    });
    
    it('retrieves initial state from adaptor', () => {
        const initialState = {};
        adaptor.setStore(initialState);
        expect(storage.getInitialState()).toEqual(initialState);
    });
    
    it('uses selected adaptor by reference', () => {
        
        const testStorageBuilder: StorageBuilder<string, Object> = new StorageBuilder<string, Object>()
            .withKey('key')
            .withAdaptor('testAdaptor');
        expect(testStorageBuilder.adaptor).toBe(adaptors.testAdaptor);
    });

});

interface ITestAdaptor {
    getStore: () => Object;
    setStore: (store: Object) => void;
}

class TestAdaptor implements IAdaptor<string, Object>, ITestAdaptor {

    store: Object;

    getStore() {
        return this.store;
    }
    
    setStore(store: Object) {
        this.store = store;
    }
    
    getItem(key: string) {
        return this.store;
    }
    
    setItem(key: string, data: Object) {
        this.store = data;
        return data;
    }
    
    isPresent(key: string) {
        return !!this.getItem(key);
    }
    
    clear(key: string) {
        this.store = undefined;
    }
}