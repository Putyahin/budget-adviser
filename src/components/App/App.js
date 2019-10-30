import React, { Component } from 'react';
import Menu from '../Menu';
import { HomePage, TransactionsPage, OverviewPage, TransactionsTypesPage } from '../pages';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

    
    render() {

        return (
            <div>
                <Menu />
                <Switch>
                    <Route
                        path="/"
                        component={HomePage} 
                        exact
                    />
                    <Route
                        path="/transactions"
                        component={TransactionsPage} 
                    />
                    <Route
                        path="/overview"
                        component={OverviewPage} 
                    />
                    <Route
                        path="/transactionstypes"
                        component={TransactionsTypesPage} 
                    />
                </Switch>
            </div>
        );
    }
}