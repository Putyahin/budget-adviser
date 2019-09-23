import React, {Component} from 'react';
import{ connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalEditType from '../modal-edit-type/';
import * as actions from '../../actions/';

class TransactionsTypes extends Component {

    state = {
        isEdit: false,
        type: '',
        id: null,
    };

    closeModal = () => {
        this.setState({isEdit: false });
    };

    onEdit = (e) => {
        const [type, id] = e.target.id.split(';');
         this.setState({
            isEdit: true,
            id: id,
            type: type
        }); 
    };

    onUpdate = (type, newType) => {
        this.props.Edit(type, newType);
        this.setState({
            isEdit: false,
            id: null
        });
    };

    onDelete = (e) => {
        let [type, id] = e.target.id.split(';');
        id--;
        this.props.Delete(type, id);
    };

    createTable = (data, text) => {
        return (
            <div>
            <h5 className="text-center" >List of {text} types:</h5>
            <table className="container table table-hover">
                <thead >
                    <tr>
                        <th scope="col">Transaction Type</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element) => {
                        return (
                            <tr className="table" key = {element.id + '00'} >
                                <td key = {element.id + '11'} >{element.label}</td>
                                <td key = {element.id + '22'}>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        id = {text + ';' + element.id} 
                                        onClick = {this.onEdit} >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        id = {text + ';' + (element.id + 1)}
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
    };

    render() {
        const expenses = this.props.expensesTransactionsList;
        const income = this.props.incomeTransactionsList;
        return (
            <div className = "container">
                <div>
                    {this.createTable(income, 'Income')}
                </div>
                <div>    
                    {this.createTable(expenses, 'Expenses')}
                </div>
                <div>
                    {this.state.isEdit && 
                        <ModalEditType
                            onClose = {this.closeModal}
                            onAdd = {this.onUpdate}
                            modalProps = { { type: this.state.type, id: this.state.id } }
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ types: { incomeTransactionsList, expensesTransactionsList } }) => {
    return { incomeTransactionsList, expensesTransactionsList };
};

const mapDispatchToProps = (dispatch) => {
    const {editType, deleteType} = bindActionCreators(actions, dispatch)
    return {Edit: editType, Delete: deleteType};
}

export default connect (mapStateToProps, mapDispatchToProps)(TransactionsTypes); 