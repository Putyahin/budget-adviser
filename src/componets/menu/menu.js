import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo';
import {HomePage, OverviewPage, TransactionsPage, TransactionsTypesPage} from '../pages';
import './menu.css';

export default class Menu extends Component {

    render() {

        return (

            <div className = "menu navbar navbar-expand-md sticky-top navbar-dark bg-primary">
                <div className = "container-fluid">
                    
                    <Link to="/" componet={HomePage}><Logo /></Link>
                    <ul className = "navbar-nav">
                        <li className = "nav-item nav-link">
                            <Link to= "/overview" component={OverviewPage}> Overview </Link>
                        </li>
                        <li className = "nav-item nav-link">
                            <Link to= "/transactions" component={TransactionsPage}> Transactions </Link>
                        </li>
                        <li className = "nav-item nav-link">
                            <Link to= "/transactionstypes" component={TransactionsTypesPage}> Transactions Types </Link>
                        </li>
                    </ul>    
                        
                    

                </div>
            </div>

            
            
        );
    }
}