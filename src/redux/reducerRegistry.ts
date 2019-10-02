import { ReducersMapObject, Reducer } from 'redux';

export class ReducerRegistry {

    _emitChange?: (reducers: ReducersMapObject) => void;
    _reducers: ReducersMapObject;
    
    constructor() {
        this._emitChange = null;
        this._reducers = {};
    }

    getReducers() {
        return { ...this._reducers };
    }

    register( name: string, reducer: Reducer ) {
        this._reducers = { ...this._reducers, [name]: reducer };
        this.publishChange();
        console.log( 'registered reducer ' + name );
    }
    
    publishChange() {
        if ( this._emitChange ) {
            this._emitChange( this.getReducers() );
        }
    }
    
    setChangeListener( listener: (reducers: ReducersMapObject) => void ) {
        this._emitChange = listener;
    }
    
}

export default new ReducerRegistry();