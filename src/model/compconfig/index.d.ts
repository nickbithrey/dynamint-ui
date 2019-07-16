import { Action } from 'redux';
import { URI } from '~/lib';
import { ICompConfigAttribute } from 'model/compconfigattr';

export interface ICompConfig extends URI {
    reference: string;
    description: string;
    componentType: string;
    attributes?: Array<ICompConfigAttribute>;
    _links: {
        attributes: {
            href: string;
        }
    }
}

export interface ICompConfigState {
    [key: string]: ICompConfig;
}

export interface ICompConfigAction extends Action<string> {
    id: string;
    result: {
        componentConfigurations: ICompConfig;
    };
}