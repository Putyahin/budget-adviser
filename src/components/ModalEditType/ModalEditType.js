import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModalEditType extends Component {

    state = {
        id: this.props.modalProps.id,
        icon: '',
        newName: '',
        type: this.props.modalProps.type,
        isError: true,
        valid: 0
    };

    newType = () => {
        if (!this.state.isError) {
            const {icon, id, newName, type} = this.state;
            const newType = {
                id: Number(id),
                icon: icon,
                label: newName,
            };
            this.setState({ newName: '' });
            this.props.onAdd(type, newType);
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
        
        let list = '';
        if (this.state.type == 'Income') {
            list = this.props.incomeTransactionsList;
        } else {
            list = this.props.expensesTransactionsList;
        }
        const label = list[list.findIndex((element) => {
            return element.id == this.state.id;
        })]; 
        
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
                            <h5 className="modal-title">Edit type of transaction</h5>
                            <button type="button" onClick = {this.props.onClose} 
                                className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            <p>You choosed this type:</p>
                            <select className = "custom-select custom-select" value = {label.label} disabled>
                                 {list.map((element) => {
                                    return <option value = {element.label}>{element.label}</option>;
                                })} 
                            </select>
                            <p></p>
                            <p>Enter new name:</p>
                            <div className = "form-group">
                                <input className = {"form-control" + valid} type="text" value = {this.state.newName} 
                                    onChange = {this.onNameChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type = "submit" className = "btn btn-primary btn-sm"
                                onClick = {this.newType}>
                                Update
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

export default connect(mapStateToProps)(ModalEditType);