import { testDataRequest } from './TestDataRequest';

export {
    testDataRequest
};

export interface IPagingParameters {
    /** index to start the paging at */
    startIndex: number;
    /** total number of results to return */
    numResults?: number;
}

export interface IDataRequest {
    /** gets the resource specified by the uri */
    get: (uri: string, page?: IPagingParameters) => Promise<any>;
    /** updates the data at the specified uri */
    update: <T>(uri: string, data: T) => Promise<T>;
    /** deletes the data at the specified uri */
    delete: (uri: string) => Promise<boolean>;
}