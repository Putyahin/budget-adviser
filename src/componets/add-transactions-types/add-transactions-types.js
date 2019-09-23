import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/';
import ModalAddType from '../modal-add-type/';

class AddTransactionsTypes extends Component {

    state = {
        isModal: false
    };

    closeModal = () => {
        this.setState({isModal: false});
    };

    newType = () => {
        this.setState({isModal: true});
    };

    onAddType = (type, newType) => {
        this.props.Add(type, newType);
        this.setState({isModal: false});
    };

    render() {

        return (
            <div className = "container">
                <div className = "input-group mb-3">
                    <button 
                        className = "btn btn-primary"
                        onClick = {this.newType}>
                        Add type
                    </button>
                </div>
                { this.state.isModal && <ModalAddType 
                    onClose = {this.closeModal} 
                    onAdd = {this.onAddType}
                    /> }
            </div>
        );
    }
}

const mapStateToProps = ({ types: { incomeTransactionsList, expensesTransactionsList } }) => {
    return {incomeTransactionsList, expensesTransactionsList};
};

const mapDispatchToProps = (dispatch) => {
    const { addType } = bindActionCreators(actions, dispatch)
    return {Add: addType};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionsTypes);