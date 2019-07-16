import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IDetailsRowProps, DetailsRowBase, IDetailsRowBaseProps, IDetailsRowStyleProps, IDetailsRowStyles, DetailsRow, IDetailsRowFieldsProps } from 'office-ui-fabric-react/lib/DetailsList';
import { getStyles } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow.styles';

export type IFormTableRow = IDetailsRowProps;

interface IState {
    selected: boolean;
}

export class FormTableRow extends React.Component<IFormTableRow, IState> {

    
    constructor(props: IFormTableRow) {
        super(props);
        this.state = { selected: props.selection.isIndexSelected(props.itemIndex) };
    }
    
//    componentWillReceiveProps(nextProps: IFormTableRow) {
//        this.setState({
//            selected: nextProps.selection.isIndexSelected(nextProps.itemIndex)
//        })
//    }
    
    shouldComponentUpdate(nextProps: IFormTableRow, nextState: IState) {
        return nextProps.selection.isIndexSelected(this.props.itemIndex) !== nextState.selected;
    }
    
    render() {
        if (!this.props.selection.isIndexSelected(this.props.itemIndex)) {
            return <DetailsRow {...this.props} />;
        }
        return <DetailsRow {...this.props} />;
    }
}

//const UpdateRowFields = (fields: IDetailsRowFieldsProps) = (
//        
//);


//export const FormTableRow: React.StatelessComponent<IFormTableRow> = styled<
//IDetailsRowBaseProps,
//IDetailsRowStyleProps,
//IDetailsRowStyles
//>(FormTableRowBase, getStyles, undefined, {
//scope: 'FormTableRow'
//});