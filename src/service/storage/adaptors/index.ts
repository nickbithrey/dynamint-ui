import LocalStorageAdaptor from './LocalStorageAdaptor';

export interface IAdaptor<K, V> {
    getItem: (key: K) => V;
    setItem: (key: K, data: V) => V;
    isPresent: (key: K) => Boolean;
    clear: (key: K) => void;
}

type IAdaptorsMap<K, V> = {
    [key: string]: IAdaptor<K, V>;
}

const adaptors: IAdaptorsMap<any, any> = {
    'localStorage': new LocalStorageAdaptor()
};

export default adaptors;