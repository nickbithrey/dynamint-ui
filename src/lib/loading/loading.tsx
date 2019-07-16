import * as React from 'react';

export interface ILoading {
    loading: boolean;
    load: (id?: string | number) => void;
}

export const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => (
    class Loading extends React.Component<P & ILoading & {id: string | number}> {
        
        componentDidMount() {
            if (this.props.loading) {
                this.props.load(this.props.id);
            }
        }
        
        render() {
            const {
                id, 
                loading,
                ...remainingProps
            } = this.props;
            return loading ? <p>Loading</p> : <WrappedComponent loading={loading} {...remainingProps as P} />;
        }
        
    }
);
