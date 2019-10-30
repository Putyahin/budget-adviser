import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import { HomePage, OverviewPage, TransactionsPage, TransactionsTypesPage } from '../pages';
import './Menu.css';

export default class Menu extends Component {

    render() {

        return (

            <div className = "menu navbar navbar-expand-md sticky-top navbar-dark bg-primary">
                <div className = "container-fluid">
                    <NavLink to="/" componet={HomePage}><Logo /></NavLink>
                    <ul className = "navbar-nav">
                        <li className = "nav-item nav-link">
                            <NavLink 
                                to= "/overview"
                                activeClassName="active"
                                component={OverviewPage}>
                                Overview 
                            </NavLink>
                        </li>
                        <li className = "nav-item nav-link">
                            <NavLink 
                                to= "/transactions"
                                activeClassName="active"
                                component={TransactionsPage}>
                                Transactions
                            </NavLink>
                        </li>
                        <li className = "nav-item nav-link">
                            <NavLink
                                to= "/transactionstypes"
                                activeClassName="active"
                                component={TransactionsTypesPage}> 
                                Transactions Types 
                            </NavLink>
                        </li>
                    </ul>    
                </div>
            </div>

            
            
        );
    }
}