import * as React from 'react';
import { Stack, IStackItemStyles, IStackItemTokens } from 'office-ui-fabric-react/lib/Stack';

export interface IBlock {
    children: React.ReactNode;
    tokens?: IStackItemTokens;
    styles?: IStackItemStyles;
    align?: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end';
    order?: number;
    disableShrink?: boolean;
    shrink?: number | boolean | 'initial' | 'inherit' | 'unset';
    verticalFill?: boolean;
}

export const Block = ( {
    children,
    shrink = 'initial',
    align = 'auto',
    disableShrink = false,
    verticalFill = true,
    ...itemProps
}: IBlock ) => {
    return (
        <Stack.Item 
            shrink={shrink} 
            align={align} 
            disableShrink={disableShrink} 
            verticalFill={verticalFill} 
            {...itemProps}>
            {children}
        </Stack.Item>
    );
}