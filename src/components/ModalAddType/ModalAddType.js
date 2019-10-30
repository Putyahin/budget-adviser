import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModalAddType extends Component {

    state = {
        id:  new Date().getTime(),
        icon: '',
        label: '',
        toggle: 0,
        newName: '',
        type: 'Income',
        isError: true,
        valid: 0
    };

    newType = () => {
        if (!this.state.isError) {
            const {icon, id, newName, type} = this.state;
            this.setState({newName: ''});
            this.props.onAdd(type, {id: id, icon: icon, label: newName});
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

    onNameChange = (e) => {
        let name = e.target.value;
        this.setState({ newName: name });
        if(name.length > 2) {
            this.setState({isError: false, valid: 1});
        } else {
            this.setState({isError: true, valid: -1});
        }
    };

    
    render() { 
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
                            <p>Type name:</p>
                            <div className = "form-group">
                                <input className = {"form-control" + valid} type="text" value = {this.state.amount} 
                                    onChange = {this.onNameChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type = "submit" className = "btn btn-primary btn-sm"
                                onClick = {this.newType}>
                                Add
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
}

export default connect(mapStateToProps)(ModalAddType);