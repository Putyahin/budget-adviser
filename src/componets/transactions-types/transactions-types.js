import React, {Component} from 'react';
import{ connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalEditType from '../modal-edit-type/';
import ModalAddType from '../modal-add-type';
import * as actions from '../../actions/';

class TransactionsTypes extends Component {

    state = {
        isEdit: false,
        type: '',
        id: null,
        isAddModal: false
    };

    closeEditModal = () => {
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
        this.props.Delete(type, --id);
    };

    closeAddModal = () => {
        this.setState({isAddModal: false});
    };

    newAddType = () => {
        this.setState({isAddModal: true});
    };

    onAddType = (type, newType) => {
        this.props.addType(type, newType);
        this.setState({isAddModal: false});
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
        return (
            <div className = "container">
                <div className = "input-group mb-3">
                    <button 
                        className = "btn btn-primary"
                        onClick = {this.newAddType}>
                        Add type
                    </button>
                </div>
                    { this.state.isAddModal &&
                        <ModalAddType 
                            onClose = {this.closeAddModal} 
                            onAdd = {this.onAddType}
                        />
                    }
                <div>
                    {this.createTable(this.props.incomeTransactionsList, 'Income')}
                </div>
                <div>    
                    {this.createTable(this.props.expensesTransactionsList, 'Expenses')}
                </div>
                <div>
                    { this.state.isEdit && 
                        <ModalEditType
                            onClose = {this.closeEditModal}
                            onAdd = {this.onUpdate}
                            modalProps = { { type: this.state.type, id: this.state.id } }
                        />
                    }
                </div>
            </div>
        );
    };
}

const mapStateToProps = ({ types: { incomeTransactionsList, expensesTransactionsList } }) => {
    return { incomeTransactionsList, expensesTransactionsList };
};

const mapDispatchToProps = (dispatch) => {
    const {addType, editType, deleteType} = bindActionCreators(actions, dispatch)
    return {addType: addType, Edit: editType, Delete: deleteType};
};

export default connect (mapStateToProps, mapDispatchToProps)(TransactionsTypes); 