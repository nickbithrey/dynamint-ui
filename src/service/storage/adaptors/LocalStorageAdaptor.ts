import {
    IAdaptor
} from './';

export default class LocalStorageAdaptor<V> implements IAdaptor<string, V> {

    /**
     * get item from local window storage
     * 
     * @returns the item in local storage
     */
    getItem(key: string) {
        return JSON.parse(window.localStorage.getItem(key));
    }
    
    /**
     * sets item into local window storage
     * 
     * @returns the item just set in local storage
     */
    setItem(key: string, data: V) {
        let value = JSON.stringify(data);
        window.localStorage.setItem(key, value);
        return data;
    }
    
    /**
     * boolean check on whether the local storage has the item or not
     * 
     * @returns true if item exists
     */
    isPresent(key: string) {
        return !!this.getItem(key);
    }
    
    /**
     * Removes the item stored at the given namespace.
     */
    clear(key: string) {
        window.localStorage.removeItem(key);
    }
}