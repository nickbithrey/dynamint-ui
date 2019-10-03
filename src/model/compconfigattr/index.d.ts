import { Action } from 'redux';
import { URI } from '~/lib';

export interface ICompConfigAttribute {
    name: string;
    type: string;
    defaultValue: any;
}

export interface ICompConfigAttributeState {
    [key: string]: Array<ICompConfigAttribute>;
}

export interface ICompConfigAttributeAction extends Action<string> {
    id: string;
    result: {
        componentConfigurationAttributes: Array<ICompConfigAttribute>;
    };
}