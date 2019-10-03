import * as React from 'react';
import {match} from 'react-router-dom';

export interface IUrlMatcher {
    match: match<IUrlParam>
};

export interface IUrlParam {
    id: string;
}

export const withUrlMatcher = <P extends any & IUrlMatcher>(WrappedComponent: React.ComponentType<P>) => (
    class UrlMatcher extends React.Component<P> {
        
        constructor(props: P) {
            super(props);
        }
        
        render() {
            return <WrappedComponent id={this.props.match.params.id as string} {...this.props as P} />
        }
        
    }
);