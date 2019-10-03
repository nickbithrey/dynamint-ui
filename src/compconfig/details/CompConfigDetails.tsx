import * as React from 'react';
import { Form } from 'lib/form';
import { Field } from 'lib/form/field';
import { ICompConfig } from 'model/compconfig';
import Attributes, { Attribute } from './attributes';

export interface IDetails {
    id: string | number;
    item: ICompConfig;
    update: (item: ICompConfig) => void;
    back: () => void;
}

const Details = ({item, update, back}: IDetails) => {
    return (
        <Form entity={item} storageKey={'compConfigDetails'} save={update} back={back}>
            <Field
                type={'text'}
                name={'reference'}
                label={'Reference'}
                value={item.reference}
            />
            <Field
                type={'text'}
                name={'description'}
                label={'Description'}
                value={item.description}
            />
		    <Field
                type={'text'}
                name={'componentType'}
                label={'ComponentType'}
                value={item.componentType}
            />
            <Attributes link={item._links.attributes} entityForm={Attribute} />
        </Form>
    );
}

export default Details;