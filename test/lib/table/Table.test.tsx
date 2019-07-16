import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    Table,
    ITable,
    ITableColumn
} from 'lib/table/Table';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

const expectedTag = 'StyledShimmeredDetailsListBase';

describe('<Table />', () => {
    
    const props: ITable = {
        loading: false,
        items: [
                {key: 'item1', col1: 'cell11', col2: 'cell12', col3: 'cell13'},
                {key: 'item2', col1: 'cell21', col2: 'cell22', col3: 'cell23'}
            ],
        columns: [
                  {name: 'column 1', key: 'col1', fieldName: 'col1', minWidth: 50},
                  {name: 'column 2', key: 'col2', fieldName: 'col2', minWidth: 60},
                  {name: 'column 3', key: 'col3', fieldName: 'col3', minWidth: 70}
            ],
        selection: new Selection()
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Table {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('renders a valid tag and matches snapshot when no items are supplied', () => {
        wrapper.setProps({items: undefined});
        expect(wrapper.find(expectedTag).prop('items')).toHaveLength(0);
    });
    
});