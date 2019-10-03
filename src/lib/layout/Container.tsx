import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

export interface IContainer {
    children?: React.ReactNode;
    tokens?: IStackTokens,
    styles?: IStackStyles
}

export const Container = ({children, tokens, styles}: IContainer) => {
    if (!children) {
        return null;
    }
    return (
        <Stack tokens={tokens} styles={styles}>
            {children}
        </Stack>
    );
}