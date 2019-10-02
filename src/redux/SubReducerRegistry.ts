import { combineReducers } from 'redux';
import { ReducerRegistry } from './reducerRegistry';

export class SubReducerRegistry extends ReducerRegistry {
    
    private key: string;

    private parent: ReducerRegistry;
    
    constructor(key: string, parent: ReducerRegistry) {
        super();
        this.key = key;
        this.parent = parent;
    }
    

    publishChange() {
        const reducer = combineReducers(super.getReducers());
        this.parent.register(this.key, reducer);
    }
    
}