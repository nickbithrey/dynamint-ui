import { connect } from 'react-redux';
import { withLoading, ILoading } from 'lib/loading';
import State from '~/redux/ApplicationState';
import { ICompConfig } from 'model/compconfig';
import { ThunkDispatch } from 'redux-thunk';
import { load, update } from './action';
import { IURILink } from '~/lib';
import { Field, IField } from 'lib/form/field';
import { ITableColumn } from 'lib/table';

const initialState: State = {
    app: {
    },
    model: {
        compConfig: {}
    }
};

interface OwnProps {
    link: IURILink;
    entity?: ICompConfig;
    entityForm: React.ComponentType<any>;
}

const columns: Array<ITableColumn> = [
  {key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 300},
  {key: 'type', name: 'Type', fieldName: 'type', minWidth: 50, maxWidth: 100},
  {key: 'defaultValue', name: 'Default Value', fieldName: 'defaultValue', minWidth: 300}
];

const mapStateToProps = ( state: State = initialState, ownProps: OwnProps) => {
    return {
        id: ownProps.link.href,
        loading: !ownProps.entity.attributes,
        type: 'list',
        label: 'Attributes',
        name: 'attributes',
        value: ownProps.entity.attributes ? ownProps.entity.attributes : [],
        entityForm: ownProps.entityForm,
        storeKey: 'config-attribute-detail-selection',
        columns: columns
    } as unknown as IField<Array<any>> & ILoading;
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps) => {
    return {
        load: (id: string) => dispatch( load(id, ownProps.entity) ),
        update: (name: string, attributes: Array<any>) => dispatch( update(attributes, ownProps.entity) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(Field));



