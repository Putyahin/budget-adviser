import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ModalAddTransaction.css';

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
                description: '',
                type: 'Income',
                isError: true,
                validAmount: 0, 
                validDescription: 0
            };
        } else
        {
            this.state = this.props.modalProps;
        }
    }
    
    newTransaction = (e) => {
        if (!this.state.isError) {
            e.preventDefault();
            let {icon, toggle, label, amount, description, type, date} = this.state;
            if (date===undefined) {date = new Date();}
            const id = date.getTime();
            const transaction = {
                id: id,
                icon: icon,
                toggle: toggle,
                label: label,
                amount: amount,
                description: description,
                type: type,
                date: date

            };
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
            this.setState({isError: false, validAmount: 1});
        } else {
            this.setState({isError: true, validAmount: -1});
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

    onDescriptionChange = (e) => {
        let description = e.target.value;
        this.setState({ description: description });
        if(description.length > 2) {
            this.setState({isError: false, validDescription: 1});
        } else {
            this.setState({isError: true, validDescription: -1});
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
        let validAmount = '';
        if(this.state.validAmount == 1) {
            validAmount = ' is-valid';
        } else if (this.state.validAmount == -1) {
            validAmount = ' is-invalid';
        }
        let validDescription = '';
        if(this.state.validDescription == 1) {
            validDescription = ' is-valid';
        } else if (this.state.validDescription == -1) {
            validDescription = ' is-invalid';
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
                                <input className = {"form-control" + validAmount} type="text" value = {this.state.amount} 
                                    onChange = {this.onAmountChange}/>
                            </div>
                            <p></p>
                            <p>Description:</p>
                            <div className = "form-group">
                                <input className = {"form-control" + validDescription} type="text" value = {this.state.description} 
                                    onChange = {this.onDescriptionChange}/>
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
    }
}

const mapStateToProps = ({ types:{ expensesTransactionsList, incomeTransactionsList }}) => {
    return {
        expensesTransactionsList, 
        incomeTransactionsList
    };
};

export default connect(mapStateToProps)(ModalAddTransaction);