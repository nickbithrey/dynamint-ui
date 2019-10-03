import * as React from 'react';
import { 
    PrimaryButton, 
    DefaultButton, 
    CommandBarButton, 
    IconButton,
    BaseButton
} from 'office-ui-fabric-react/lib/Button';
import { Link } from 'react-router-dom';
import * as Assert from 'util/Assert';

export interface IButton {
    content: string;
    onClick?: (e?: React.MouseEvent<BaseButton>) => void;
    type: 'primary' | 'default' | 'command' | 'icon';
    link?: string;
}

const buttonTypes = {
    primary: PrimaryButton,
    default: DefaultButton,
    command: CommandBarButton,
    icon: IconButton
};

export class Button extends React.Component<IButton> {
    
    constructor(props: IButton) {
        super(props);
    }
    
    render() {
        const {
            content,
            onClick,
            type,
            link
        } = this.props;
        const Btn = buttonTypes[type];
        Assert.assertDefined(Btn, 'no button registered for type ' + type + '. only types ' + Object.keys(buttonTypes) + ' are available');
        const result = <Btn 
                    text={content}
                    onClick={onClick}
                />
        if (link) {
            return <Link to={link}>{result}</Link>
        }
        return result;
    }
    
}