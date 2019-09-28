import React, { Component } from 'react';
import {connect} from 'react-redux';
import './modal-add-transaction.css';

class ModalAddTransaction extends Component {

    constructor(props) {
        super(props);
        if(this.props.modalProps == undefined) {
            this.state = {
                id: 0,
                icon: '',
                toggle: 0,
                label: this.props.incomeTransactionsList[0].label,
                amount: '',
                type: 'Income',
                isError: true,
                valid: 0
            };
        } else
        {
            this.state = this.props.modalProps;
        }
    }
    
    newTransaction = (e) => {
        if (!this.state.isError) {
            e.preventDefault();
            const {icon, toggle, label, amount, type} = this.state;
            const date = new Date();
            const id = date.getTime();
            const transaction = {
                id: id,
                icon: icon,
                toggle: toggle,
                label: label,
                amount: amount,
                type: type,
                date: date,

            };
            this.setState({amount: ''});
            this.props.onAdd(transaction);
        }
    };

    onTransactionChange = (e) => {
        this.setState({label: e.target.value});
    };

    onAmountChange = (e) => {
        let amount = e.target.value;
        amount = amount.replace(/,/g,'.');
        this.setState({amount: amount});
        amount = Number(amount);
        if(typeof(amount) == 'number' && amount > 0) {
            this.setState({isError: false, valid: 1});
        } else {
            this.setState({isError: true, valid: -1});
        }
    };

    onTypeChange = (e) => {
        if (e.target.id === 'btn1') {
            this.setState({
                type: 'Income', 
                label: this.props.incomeTransactionsList[0].label,
                toggle: 0
            });
        } else {
            this.setState({
                type: 'Expenses', 
                label: this.props.expensesTransactionsList[0].label,
                toggle: 1
            });
        }
    };

    render() {
        let list;
        if (this.state.type === 'Income') {
            list = this.props.incomeTransactionsList;
        } else {
            list = this.props.expensesTransactionsList;
        }    
        let toggleIncome = '';
        let toggleExpenses = '';
        if (this.state.toggle == 0){
            toggleIncome = ' active';
        } else {
            toggleExpenses = ' active';
        }
        let valid = '';
        if(this.state.valid == 1) {
            valid = ' is-valid';
        } else if (this.state.valid == -1) {
            valid = ' is-invalid';
        }

        return (
            <div className="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add transaction</h5>
                            <button type="button" onClick = {this.props.onClose} 
                                className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Choose type:</p>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={"btn btn-outline-primary btn-sm" + toggleIncome} >
                                    <input type="radio" name="options" autoComplete="off" checked="" 
                                        id="btn1" onChange= {this.onTypeChange}/> Income
                                </label>
                                <label className={"btn btn-outline-primary btn-sm" + toggleExpenses} >
                                    <input type="radio" name="options" autoComplete="off" 
                                        id="btn2" onChange= {this.onTypeChange}/> Expenses
                                </label>
                            </div>
                            <p></p>
                            <p>Choose transaction:</p>
                            <select className = "custom-select custom-select" value = {this.state.label} onChange = {this.onTransactionChange}>
                                {list.map((element) => {
                                    return <option value = {element.label}>{element.label}</option>;
                                })}
                            </select>
                            <p></p>
                            <p>Amount:</p>
                            <div className = "form-group">
                                <input className = {"form-control" + valid} type="text" value = {this.state.amount} 
                                    onChange = {this.onAmountChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type = "submit" className = "btn btn-primary btn-sm"
                                onClick = {this.newTransaction}>
                                {this.props.btnName}
                            </button>
                            <button type = "cancel" className = "btn btn-outline-info btn-sm" 
                                onClick = {this.props.onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = ({ types:{ expensesTransactionsList, incomeTransactionsList }}) => {
    return {
        expensesTransactionsList, 
        incomeTransactionsList
    };
}

export default connect(mapStateToProps)(ModalAddTransaction);