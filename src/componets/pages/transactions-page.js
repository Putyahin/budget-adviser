import React, {Component} from 'react';
import TransactionsList from '../transactions-list';
import AddTransaction from '../add-transaction/';

export default class TransactionsPage extends Component {

    render() {

        return (
           <div>
                <AddTransaction />
                <TransactionsList />
           </div>
        );
    }
}