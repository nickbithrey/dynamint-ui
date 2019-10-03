import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

const Router = () => (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route path="/" component={App} />
                </div>
            </BrowserRouter>
        </Provider>
    );

ReactDOM.render(<Router />, document.getElementById("index"));