import * as React from 'react';
import { ITableColumn, ITableItem } from 'lib/table';
import Text from 'lib/text';
import { Condition } from '~/lib';
import { Selector, ISelectionDetails, ISelectionButton, SelectionType } from 'lib/selector';

export interface ICompConfigSelection {
    id: string | number;
    loading: boolean;
    items: Array<any & ITableItem>;
    columns: Array<ITableColumn>;
}

const editButton: ISelectionButton & Condition<ISelectionDetails> = {
    button: {
        key: 'edit', 
        content: 'Edit',
        type: 'primary'
    },
    linkResolver: (input: ISelectionDetails) => ({pathname: '/compconfig/details', state: { uri: input.selected[0]._uri, readOnly: false }}),
    condition: (input: ISelectionDetails) => input.selected.length > 0
};

const viewButton: ISelectionButton & Condition<ISelectionDetails> = {
    button: {
        key: 'view',
        content: 'View', 
        type: 'default'
    },
    linkResolver: (input: ISelectionDetails) => ({pathname: '/compconfig/details', state: { uri: input.selected[0]._uri, readOnly: true }}),
    condition: (input: ISelectionDetails) => input.selected.length > 0
};

const createButton: ISelectionButton & Condition<any> = {
    button: {
        key: 'create',
        content: 'Create',
        link: '/compconfigs/details',
        type: 'default'
    },
    condition: (input: ISelectionDetails) => input.selected.length === 0
};

const Selection = ({items, loading, columns}: ICompConfigSelection) => {
    const buttons: Array<ISelectionButton & Condition<ISelectionDetails>> = [
        viewButton,
        editButton,
        createButton
    ];
    return (
        <div>
            <Text>Configuration Selection</Text>
            <Selector
                storeKey={'config-selection'}
                loading={loading}
                items={items}
                columns={columns}
                buttons={buttons}
                selectionType={SelectionType.single}
            />
        </div>
    );
}

export default Selection;