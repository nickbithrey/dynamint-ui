import * as React from 'react';
import { TextField } from './TextField';
import { CheckboxField } from './CheckboxField';
import { ListField } from './ListField';
import { IURILink } from '~/lib';

export const updateOnChange = <V extends IFieldValueType>(name: string, update: (name: string, value: V) => void) => (
    (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        update(name, e.target.value as unknown as V)
    }
);

export type IFieldType = 'text' | 'checkbox' | 'list';

export type IFieldValueType = string | number | boolean | Array<any> | IURILink;

export interface IField<V extends IFieldValueType> extends ITypedField<V> {
    type: IFieldType;
}

export interface ITypedField<V extends IFieldValueType> {
    name: string;
    label?: string;
    value: V;
    update?: (key: string, value: V) => void;
    entity?: any;
    [key: string]: any;
}

const fieldTypes: { [key in IFieldType]: React.ComponentType<any>} = {
    text: TextField,
    checkbox: CheckboxField,
    list: ListField,
};

export const Field = <V extends IFieldValueType>({type, ...remainingProps}: IField<V>) => {
    const FieldType: React.ComponentType<ITypedField<IFieldValueType>> = fieldTypes[type];
    return <FieldType {...remainingProps} />
}