import * as React from 'react';
import Table, { ITableItem, ITableColumn } from 'lib/table';
import { IButton, ButtonContainer } from 'lib/button';
import { Key, Condition, URI } from '~/lib';
import { ISelection, Selection, SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { BaseButton } from 'office-ui-fabric-react/lib/Button';
import StorageBuilder, { Storage } from 'service/storage';

export interface ISelector {
    storeKey: string;
    loading: boolean;
    items: Array<ITableItem>;
    columns: Array<ITableColumn>
    buttons: Array<ISelectionButton & Condition<ISelectionDetails>>;
    selectionType: SelectionType;
}

export enum SelectionType {
    single = SelectionMode.single,
    multiple = SelectionMode.multiple,
}

export interface ISelectionButton {
    button: IButton & Key;
    linkResolver?: (selectionDetails: ISelectionDetails) => string | object;
    onClickResolver?: (selectionDetails: ISelectionDetails) => (e?: React.MouseEvent<BaseButton>) => void;
}

export interface ISelectorState {
    selectionDetails: ISelectionDetails;
}

export interface ISelectionDetails {
    selectedCount: number;
    selected: Array<any & URI>;
    selectedIndices: Array<number>;
}

export class Selector extends React.Component<ISelector, ISelectorState> {

    storage: Storage<string, ISelectorState>;
    
    onSelectionChanged = (): void => {
        const stateUpdate = { selectionDetails: this.getSelectionDetails() };
        this.setState(stateUpdate);
    };
    
    selection: ISelection;
    
    constructor(props: ISelector) {
        super(props);
        
        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged,
            selectionMode: props.selectionType as number
        });
        
        this.storage = new StorageBuilder<any, ISelectorState>()
            .withKey('dynamint-ui-selector-' + props.storeKey)
            .withAdaptor('localStorage')
            .build();
        
        this.state = {
            selectionDetails: {
                selectedCount: 0,
                selected: [],
                selectedIndices: []
            }
        };
    }
    
    componentDidMount() {
        const initialState = this.storage.getInitialState();
        if (initialState) {
            this.setState(initialState);
            initialState.selectionDetails.selectedIndices.forEach(i => this.selection.toggleIndexSelected(i));
        }
    }
    
    componentDidUpdate() {
        this.storage.store(this.state); // need to update the selection to storage
    }
    
    componentWillUnmount() {
        this.storage.clear(); // need to clear the selection from storage
    }
    
    getSelectionDetails() {
        const selectedCount = this.selection.getSelectedCount();
        const selected = this.selection.getSelection();
        const selectedIndices = this.selection.getSelectedIndices();
        return {
            selectedCount,
            selected,
            selectedIndices
        };
    }
    
    render() {
        const {
            loading,
            items,
            columns,
            buttons
        } = this.props;
        const displayButtons: Array<IButton & Key> = buttons.filter(btn => btn.condition(this.state.selectionDetails)).map(btn => {
           return {
                ...btn.button, 
                link: btn.linkResolver ? btn.linkResolver(this.state.selectionDetails) : btn.button.link,
                onClick: btn.onClickResolver ? btn.onClickResolver(this.state.selectionDetails) : btn.button.onClick
            }
        }) as Array<IButton & Key>;
        
        return (
            <>
                <Table 
                    loading={loading}
                    items={items} 
                    columns={columns}
                    selection={this.selection}
                />
                <ButtonContainer buttons={displayButtons} />
            </>
        );
    }
    
}