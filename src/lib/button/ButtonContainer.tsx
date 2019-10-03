import * as React from 'react';
import {
    Button,
    IButton
} from './Button';
import * as Assert from 'util/Assert';
import {
    Key
} from '../';

export interface IButtonContainer {
    buttons: Array<IButton & Key>
}

export const ButtonContainer = ({buttons}: IButtonContainer) => {
    Assert.assertDefined(buttons, 'Cannot create buttons container with no buttons');
    if (buttons.length === 0) {
        // do not render
        return null;
    }
    return (
        <>
            {buttons.map(b => <Button {...b} />)}
        </>
    );
}