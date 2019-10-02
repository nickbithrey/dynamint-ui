import { Dispatch, Action } from 'redux';

interface ISpringDataEmbedded {
    [key: string]: any;
}

interface ISpringDataLinks {
    self: ISpringDataLink;
    [key: string]: ISpringDataLink;
}

interface ISpringDataLink {
    href: string;
}

interface ISpringDataResponseAction extends Action<string> {
    result: {
        _embedded: ISpringDataEmbedded;
        _links: ISpringDataLinks;
        [key: string]: any;
    }
}

export default () => (next: Dispatch) => (action: ISpringDataResponseAction) => {
    if (!action.result || !action.result._embedded) {
        return next(action);
    }
    
    const embedded = action.result._embedded;
    Object.keys(embedded).map(key => {
        return action.result[key] = embedded[key].reduce((obj: { [key: string]: ISpringDataEmbedded }, item: ISpringDataEmbedded) => {
            item._uri = item._links.self.href;
            obj[item._links.self.href] = item;
            return obj;
        }, {})
    });
    
    return next(action);
}