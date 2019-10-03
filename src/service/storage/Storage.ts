import adaptors, { IAdaptor } from './adaptors';

export interface IStorageOptions<K, V> {
    key: K;
    adaptor: IAdaptor<K, V>;
    timeout: number;
}

export class Storage<K, V> {
    
    key: K;
    
    adaptor: IAdaptor<K,V>;

    timeout: number;
    
    constructor(options: IStorageOptions<K, V>) {
        this.key = options.key;
        this.adaptor = options.adaptor;
        this.timeout = options.timeout;
    }
    
    getInitialState(): V {
        return this.adaptor.getItem(this.key);
    }
    
    store(state: V) {
        this.adaptor.setItem(this.key, state);
    }
    
    clear() {
        this.adaptor.clear(this.key);
    }
    
}

export default class StorageBuilder<K, V> {
    
    key: K;
    
    adaptor: IAdaptor<K, V>;

    defaultAdaptor: IAdaptor<K, V> = adaptors.localStorage;

    timeout: number;

    defaultTimeout: number = 300;

    withKey(key: K) {
        this.key = key;
        return this;
    }
    
    withOverrideAdaptor(adaptor: IAdaptor<K, V>) {
        this.adaptor = adaptor;
        return this;
    }
    
    withAdaptor(name: string) {
        this.adaptor = adaptors[name];
        return this;
    }
    
    withTimeout(timeout: number) {
        this.timeout = timeout;
        return this;
    }
    
    build() {
        return new Storage({
            key: this.key,
            adaptor: this.adaptor ? this.adaptor : this.defaultAdaptor,
            timeout: this.timeout ? this.timeout : this.defaultTimeout
        })
    }
    
}