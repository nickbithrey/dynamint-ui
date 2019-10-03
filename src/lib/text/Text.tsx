import * as React from 'react';
import { Text, ITextProps } from 'office-ui-fabric-react/lib/Text';

export interface IText extends ITextProps {
    children: React.ReactNode;
}

const T = ({children, ...settings}: IText) => (
    <Text {...settings}>
        {children}
    </Text>
);

export default T;