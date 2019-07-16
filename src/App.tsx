import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import CompConfig from './compconfig';

initializeIcons();

const App = ( { history }: RouteComponentProps ) => {
    return (<CompConfig />);
};

export default App;