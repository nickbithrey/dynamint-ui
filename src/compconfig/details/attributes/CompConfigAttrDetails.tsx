import * as React from 'react';
import { Form } from 'lib/form';
import { Field } from 'lib/form/field';
import { ICompConfigAttribute } from 'model/compconfigattr';

export interface IDetails {
    id: string | number;
    item: ICompConfigAttribute;
    update: (attribute: ICompConfigAttribute) => void;
    back: () => void;
}

const Details = ({item, update, back}: IDetails) => {
    return (
        <Form entity={item} storageKey={'compConfigAttributeDetails'} save={update} back={back}>
            <Field
                type={'text'}
                name={'name'}
                label={'Name'}
                value={item.name}
                update={() => {}}
            />
            <Field
                type={'text'}
                name={'type'}
                label={'Type'}
                value={item.type}
                update={() => {}}
            />
            <Field
                type={'text'}
                name={'defaultValue'}
                label={'Default Value'}
                value={item.defaultValue}
                update={() => {}}
            />
        </Form>
    );
}

export default Details;