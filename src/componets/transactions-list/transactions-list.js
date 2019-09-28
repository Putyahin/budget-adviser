import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './transactions-list.css';
import * as actions from '../../actions/';
import ModalAddTransaction from '../modal-add-transaction/';

class TransactionsList extends Component {
    state = {
        isEdit: false,
        id: null
    };

    closeModal = () => {
        this.setState({isEdit: false });
    };

    onEdit = (e) => {
        const id = e.target.id;
        this.setState({
            isEdit: true,
            id: id
        });
        
    };

    onUpdate = (transaction) => {
        this.props.Edit(this.state.id, transaction);
        this.setState({
            isEdit: false,
            id: null
        });
    };

    onDelete = (e) => {
        const id = e.target.id - 1;
        this.props.Delete(id);
    };

    render() {
        const transactions = this.props.transactions;
        let table;
        if(transactions.length == 0) {
            table = (
                <h5>No transactions yet</h5>
            );
        } else {
            table = (
                <div>
                <h5 className="text-center" >List of transactions:</h5>
                <table className="table table-hover">
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Transaction</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    

                        {transactions.map((element) => {
                            return (
                                <tr className="table">

                                    <td>{element.type}</td>
                                    <td>{element.label}</td>
                                    <td>{element.amount}</td>
                                    <td>
                                        {element.date.toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-outline-primary btn-sm"
                                            id = {element.id} 
                                            onClick = {this.onEdit} >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-outline-primary btn-sm"
                                            id = {element.id + 1}
                                            onClick = {this.onDelete}>
                                            Delete
                                        </button>
                                    </td>
                                
                                </tr>);
                        })}
                    
                    </tbody>
                </table>
                </div>
            );
        }
        return (
            <div className="container">
                {table}
                {this.state.isEdit && 
                    <ModalAddTransaction 
                        onClose = {this.closeModal}
                        onAdd = {this.onUpdate}
                        btnName = {'Update'}
                        modalProps = 
                            {transactions[transactions.findIndex(
                                (element) => {
                                    return element.id == this.state.id
                                }
                            )]}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = ({ transactions }) => {
    return { transactions };
};

const mapDispatchToProps = (dispatch) => {
    const {editTransaction, deleteTransaction} = bindActionCreators(actions, dispatch)
    return {Edit: editTransaction, Delete: deleteTransaction};
} 

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);