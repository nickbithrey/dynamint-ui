import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { updateOnChange, ITypedField } from './Field';

export const CheckboxField = ({name, label, value, update}: ITypedField<boolean>) => (
        <Checkbox 
            label={label}
            defaultChecked={value}
            onChange={updateOnChange(name, update)}
        />
);

