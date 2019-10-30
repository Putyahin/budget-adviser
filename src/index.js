import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/';
import ErrorGlobal from './components/ErrorGlobal';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <ErrorGlobal>
            <Router>
                <App />
            </Router>
        </ErrorGlobal>
    </Provider>,
    document.getElementById('root')
);