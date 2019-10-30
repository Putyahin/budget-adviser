import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './TransactionsList.css';
import * as actions from '../../actions/';
import ModalAddTransaction from '../ModalAddTransaction/';
import DatePicker from '../DatePicker/';

class TransactionsList extends Component {
    state = {
        isAdd: false,
        isEdit: false,
        id: null,
        description: ''
        
    };

    closeModalEdit = () => {
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

    closeAdd = () => {
        this.setState({isAdd: false});
    };

    newTransaction = () => {
        this.setState({isAdd: true});
    };

    onAddTransaction = (transaction) => {
        this.setState({isAdd: false});
        this.props.Add(transaction);
    };

    onDescriptionReset = () => {
        this.setState({description: ''});
    };

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    render() {
        let transactions = this.props.transactions;
        const description = this.state.description;
        transactions = transactions.filter((element) => {
            return element.description.toLowerCase().trim().includes(description.trim().toLowerCase());
        });
        const from = this.props.period.from;
        let to = new Date(this.props.period.to);
        to.setDate(to.getDate() + 1);
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
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    

                        {transactions.map((element) => {
                            const date = element.date;
                            if (date < from || date > to) return null;
                            return (
                                <tr className="table">

                                    <td>{element.type}</td>
                                    <td>{element.label}</td>
                                    <td>{element.amount}</td>
                                    <td>{element.description}</td>
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

                <div className = "row align-items-center">
                    <button 
                        className = "btn btn-primary"
                        onClick = {this.newTransaction}>
                        Add transaction
                    </button>
                    <div className="description-filter input-group col-5">
                        <span className="description-text">Description filter:</span>
                        <input 
                            value={this.state.description} 
                            className="form-control"
                            onChange={this.onDescriptionChange}/>
                        <div>
                            <button
                                className="btn btn-outline-info" 
                                onClick={this.onDescriptionReset}>
                                X
                            </button>
                        </div>
                    </div>
                    <DatePicker />
                </div>
                {table}
                {this.state.isEdit && 
                    <ModalAddTransaction 
                        onClose = {this.closeModalEdit}
                        onAdd = {this.onUpdate}
                        btnName = {'Update'}
                        modalProps = 
                            {transactions[transactions.findIndex(
                                (element) => {
                                    return element.id == this.state.id;
                                }
                            )]}
                    />
                }
                { this.state.isAdd && 
                    <ModalAddTransaction 
                        onClose = {this.closeAdd} 
                        onAdd = {this.onAddTransaction}
                        btnName = {'Add'}
                    /> 
                }
            </div>
        );
    }
}

const mapStateToProps = ({ transactions, period }) => {
    return { transactions, period };
};

const mapDispatchToProps = (dispatch) => {
    const { addTransaction, editTransaction, deleteTransaction} = bindActionCreators(actions, dispatch)
    return { Add: addTransaction, Edit: editTransaction, Delete: deleteTransaction };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);