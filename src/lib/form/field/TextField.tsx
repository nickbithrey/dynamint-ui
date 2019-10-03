import * as React from 'react';
import { TextField as FTextField } from 'office-ui-fabric-react/lib/TextField';
import { updateOnChange, ITypedField } from './Field';

export const TextField = ({name, label, value, update}: ITypedField<string>) => (
        <FTextField 
            label={label}
            defaultValue={value}
            onChange={updateOnChange(name, update)}
        />
);

