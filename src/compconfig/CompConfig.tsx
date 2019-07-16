import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Selection from './selection';
import Details from './details';

const CompConfig = () => (
    <Switch>
        <Route exact path={'/compconfig'} component={Selection} />
        <Route exact path={'/compconfig/details'} component={Details} />
    </Switch>
);

export default CompConfig;