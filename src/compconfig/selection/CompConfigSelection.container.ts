import Selection from './CompConfigSelection';
import { connect } from 'react-redux';
import { withLoading } from 'lib/loading';
import { load } from './action';
import State from '~/redux/ApplicationState';
import { ITableColumn } from 'lib/table';
import { ThunkDispatch } from 'redux-thunk';

const convoKey = 'compConfigSelection';

const initialState: State = {
    app: {
    },
    model: {
        compConfig: {}
    }
};

const columns: Array<ITableColumn> = [
    {key: 'reference', name: 'Reference', fieldName: 'reference', minWidth: 100, maxWidth: 300},
    {key: 'componentType', name: 'Type', fieldName: 'componentType', minWidth: 50, maxWidth: 100},
    {key: 'description', name: 'Description', fieldName: 'description', minWidth: 300}
];

const mapStateToProps = ( state: State = initialState) => {
    const convo = state.app[convoKey];
    const items = Object.values(state.model.compConfig);
    return {
        key: convoKey, 
        items: items, 
        loading: !convo || convo.loading || !items, 
        selectedKeys: [] as Array<string | number>,
        columns: columns
    };
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        load: () => dispatch(load())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(Selection));