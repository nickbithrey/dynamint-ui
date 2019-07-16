import * as React from 'react';
import { updateOnChange, ITypedField } from './Field';
import { IButton, ButtonContainer } from 'lib/button';
import { Key, Condition } from '~/lib';
import Table, { ITableColumn } from 'lib/table';
import { Selector, ISelectionDetails, ISelectionButton, SelectionType } from 'lib/selector';

export interface IListField extends ITypedField<Array<Object>> {
    storeKey: string;
    loading: boolean;
    entityForm: React.ComponentType;
    columns: Array<ITableColumn>;
}

const createButton: ISelectionButton & Condition<any> = {
    button: {
        key: 'create',
        content: 'Create',
        link: '/compconfigs',
        type: 'default'
    },
    condition: (input: ISelectionDetails) => input.selected.length === 0
};

interface IListFieldState {
    items: Array<any>;
    selectedItem?: any;
    selectedIndex?: number;
}

export class ListField extends React.Component<ITypedField<Array<Object>>, IListFieldState> {

    constructor(props: ITypedField<Array<Object>>) {
        super(props);
        this.state = {items: props.value};
        this.buttons = this.buttons.bind(this);
        this.onEditDetails = this.onEditDetails.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.updateField = this.updateField.bind(this)
        this.clearEditDetails = this.clearEditDetails.bind(this);
        this.createNewItem = this.createNewItem.bind(this);
    }
    
    buttons(): Array<ISelectionButton & Condition<any>> {
        return [
            {
                button: {
                    key: 'edit', 
                    content: 'Edit',
                    type: 'primary',
                },
                onClickResolver: this.onEditDetails,
                condition: (input: ISelectionDetails) => input.selected.length > 0,
             },
             {
                 button: {
                     key: 'create',
                     content: 'Create',
                     type: 'default',
                     onClick: this.createNewItem
                 },
                 condition: (input: ISelectionDetails) => input.selected.length === 0
             }
        ];
    }
    
    createNewItem(): void {
        this.onEditDetails({
            selectedCount: 1,
            selected: [{}],
            selectedIndices: [this.state.items.length]
        })();
    }
    
    updateField(item: any): void {
        const list = [...this.state.items];
        list[this.state.selectedIndex] = item;
        this.props.update(this.props.name, list);
        this.clearEditDetails();
        this.setState({
            items: list
        });
    }
    
    onEditDetails(input: ISelectionDetails): () => void {
        return () => {
            this.setState({selectedItem: input.selected[0], selectedIndex: input.selectedIndices[0]});
        }
    }
    
    clearEditDetails(): void {
        this.setState({
            selectedItem: undefined,
            selectedIndex: undefined
        });
    } 
    
    render() {
        const {
            loading,
            columns,
            entityForm,
            storeKey
        } = this.props;
        const {
            items
        } = this.state;
        return (
            <>
                <Selector
                    storeKey={storeKey}
                    loading={loading}
                    items={items}
                    columns={columns}
                    buttons={this.state.selectedItem ? [] : this.buttons()}
                    selectionType={SelectionType.single}
                />
                {
                    this.renderForm(entityForm)
                }
            </>
        );
    }
    
    renderForm(entityForm: React.ComponentType<any>) {
        const Form = entityForm;
        if (this.state.selectedItem) {
            return <Form 
                item={this.state.selectedItem}
                update={this.updateField}
                back={this.clearEditDetails}
            />;
        }
        return null;
    }
    
}

