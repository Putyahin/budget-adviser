import React, {Component} from 'react';
import { connect } from 'react-redux';
import ModalAddTransaction from '../modal-add-transaction';
import {addTransaction} from '../../actions';
import {bindActionCreators} from 'redux';

class AddTransaction extends Component {

    state = {
        isModal: false
    };

    closeModal = () => {
        this.setState({isModal: false});
    };

    newTransaction = () => {
        this.setState({isModal: true});
    };

    onAddTransaction = (transaction) => {
        this.setState({isModal: false});
        this.props.addTransaction(transaction);
    };

    render() {

        return (
            <div>
                <div className = "container input-group mb-3">
                    <button 
                        className = "btn btn-primary"
                        onClick = {this.newTransaction}>
                        Add transaction
                    </button>
                </div>
                { this.state.isModal && <ModalAddTransaction 
                    onClose = {this.closeModal} 
                    onAdd = {this.onAddTransaction}
                    btnName = {'Add'}/> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        transactions: state.transactions
    };    
}

const mapDispatchToProps = (dispatch) => {
    const add = bindActionCreators(addTransaction, dispatch);
    return {addTransaction: add};
};

export default connect (mapStateToProps, mapDispatchToProps)(AddTransaction);