import * as React from 'react';
import { 
    DetailsListLayoutMode, 
    IColumn, 
    DetailsRow,
    IDetailsRowProps,
    IDetailsRowBaseProps,
    DetailsColumnBase
} from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import {
    DefaultTableRow,
    IDefaultTableRow
} from './DefaultTableRow';
import { ISelection } from 'office-ui-fabric-react/lib/Selection';

export interface ITable {
    loading: boolean;
    items: Array<ITableItem>;
    columns: Array<ITableColumn>;
    selection?: ISelection;
    onRenderRow?: IRenderFunction<IDefaultTableRow>;
    onRenderItemColumn?: (item: ITableItem, index: number, column: ITableColumn) => React.ReactNode;
    onItemInvoked?: (item?: ITableItem, index?: number, ev?: Event) => void;
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
            selection,
            onRenderRow,
            onRenderItemColumn,
            onItemInvoked
        } = this.props;
        return (
                <ShimmeredDetailsList
                    items={items ? items : []}
                    columns={columns}
                    enableShimmer={loading}
                    selection={selection}
                    selectionPreservedOnEmptyClick={true}
                    onRenderRow={onRenderRow}
                    onRenderItemColumn={onRenderItemColumn}
                    onItemInvoked={onItemInvoked}
                />
        );
    }
    
}