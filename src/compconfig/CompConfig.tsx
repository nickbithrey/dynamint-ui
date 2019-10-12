import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Selection from './selection';
import Details from './details';

const CompConfig = () => (
    <Switch>
        <Route exact path={'/compconfig'} component={Selection} />
        <Route exact path={'/compconfig/details'} component={Details} />
        <Link to="/compconfig">Config</Link>
    </Switch>
);

export default CompConfig;
