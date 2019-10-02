import * as React from 'react';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { ISelection } from 'office-ui-fabric-react/lib/Selection';

export interface ITable {
    loading: boolean;
    items: Array<ITableItem>;
    columns: Array<ITableColumn>;
    selection?: ISelection;
}

export interface ITableItem {
    [key: string]: any;
}

export interface ITableColumn extends IColumn {
    name: string;
    key: string;
    fieldName: string;
    minWidth: number;
    maxWidth?: number;
}

export class Table extends React.Component<ITable> {
    
    constructor(props: ITable) {
        super(props);
    }
    
    render() {
        const {
            items,
            columns,
            loading,
            selection
        } = this.props;
        return (
                <ShimmeredDetailsList
                    items={items ? items : []}
                    columns={columns}
                    enableShimmer={loading}
                    selection={selection}
                    selectionPreservedOnEmptyClick={true}
                />
        );
    }
    
}