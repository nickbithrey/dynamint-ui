import * as React from 'react';
import { IButton, ButtonContainer } from 'lib/button';
import { Key } from '~/lib';
import StorageBuilder, { Storage } from 'service/storage';

export interface IForm {
    storageKey: string;
    entity: any;
    save: (obj: any) => void;
    back: () => void;
}

export interface IFormField {
    updateField: (name: string, value: any) => void;
    entity: any;
}

interface IFormState {
    [key: string]: any;
}

export class Form extends React.Component<IForm, IFormState> {
    
    storage: Storage<string, IFormState>;
    
    constructor(props: IForm) {
        super(props);
        this.state = {...props.entity};
    }
    
    componentDidMount() {
        this.storage = new StorageBuilder<string, IFormState>()
            .withKey('dynamint-ui-form-' + this.props.storageKey)
            .withAdaptor('localStorage')
            .build();
    }

    componentDidUpdate() {
        this.storage.store(this.state);
    }
    
    componentWillUnmount() {
        this.storage.clear();
    }
    
    updateField = (name: string, value: any): void => {
        this.setState({
            [name]: value
        });
    }
    
    save = (): void => {
        this.props.save(this.state);
        this.props.back();
    }
    
    buttons = (): Array<IButton & Key> => {
        return [
            {key: 'back', content: 'Back', type: 'default', onClick: this.props.back},
            {key: 'save', content: 'Save', type: 'primary', onClick: this.save}
        ];
    }
    
    render() {
        const {
            children,
            entity
        } = this.props;
        return (
            <div>
                { React.Children.map(children, child => React.cloneElement(child as React.ReactElement<any & IFormField>, { entity: entity, update: this.updateField }) ) }
                <ButtonContainer buttons={this.buttons()} />
            </div>
        );
    }
}