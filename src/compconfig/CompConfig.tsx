import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Selection from './selection';
import Details from './details';

const CompConfig = () => (
    <>
        <Link to={'/compconfig'}>Comp Config</Link>
        <Switch>
            <Route exact path={'/compconfig'} component={Selection} />
            <Route exact path={'/compconfig/details'} component={Details} />
        </Switch>
    </>
);

export default CompConfig;
