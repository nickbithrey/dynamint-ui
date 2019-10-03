import { ICompConfigState } from 'model/compconfig';

export default interface State extends Object {
    app: AppState,
    model: {
        compConfig?: ICompConfigState;
        compConfigAttr?: Array<any>;
    }
}

export interface AppState {
    [key: string]: AppSelectionState | AppDetailsState;
}

export interface AppSelectionState {
    key: string;
    loading: boolean;
    updating: boolean;
}

export interface AppDetailsState {
    key: string;
    loading: boolean;
    item: any;
    updating: boolean;
}