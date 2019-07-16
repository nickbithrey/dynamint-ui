import * as modeldata from './modeldata.json';
import { IDataRequest, IPagingParameters } from './';

class TestDataRequest implements IDataRequest {
    
    get(uri: string, page?: IPagingParameters) {
        return new Promise((resolve, reject) => {
            const data = (<any>modeldata)[uri];
            if (!data.isList) {
                return resolve(data);
            }
            const list = data.list.map((listUri: string | number) => (<any>modeldata)[listUri]);
            data._embedded = {};
            data._embedded[data.keyIdentifier] = list;
            return resolve(data);
        });
    }
    
    update <T>(uri: string, data: T) {
        return new Promise<T>((resolve, reject) => {
            (<any>modeldata)[uri] = data;
            return resolve(data);
        })
    }
    
    delete(uri: string) {
        return new Promise<boolean>((resolve, reject) => {
            console.log('delete at uri ' + uri);
            return resolve(true);
        });
    };
    
}

export const testDataRequest = new TestDataRequest();