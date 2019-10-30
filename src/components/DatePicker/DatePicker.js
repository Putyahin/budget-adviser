import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';

import { formatDate, parseDate } from 'react-day-picker/moment';

class DatePicker extends Component {
    
    state = {
        from: this.props.period.from,
        to: this.props.period.to
    };

    showFromMonth = () => {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    };

    handleFromChange = (from) => {
        this.setState({ from });
        this.props.newPeriod({from: from, to: this.state.to});
    };

    handleToChange = (to) => {
        this.setState({ to });
        this.props.newPeriod({from: this.state.from, to: to});
    };

    onReset = () => {
        this.setState({
            from: undefined,
            to: undefined,
        });
        this.props.newPeriod({from: undefined, to: undefined});
    };

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div className="InputFromTo data-picker col-5">
                Period filter:{' '}
                <DayPickerInput component={props => <input size="8" className="form-control" {...props} />}
                    value={from}
                    placeholder="From"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 1,
                    }}
                    onDayChange={this.handleFromChange}
                />{' '}
                —{' '}
                <span className="InputFromTo-to">
                    <DayPickerInput 
                        component={props => <input size="8" className="form-control" {...props} />}
                        ref={el => (this.to = el)}
                        value={to}
                        placeholder="To"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: from },
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 1,
                        }}
                        onDayChange={this.handleToChange}
                    />
                </span>
                <span>
                    <button className="btn btn-outline-info" onClick={ this.onReset }>X</button>
                </span>
            </div>
        );
    }
}

const mapStateToProps = ({ period }) => {
    return { period };
};

const mapDispatchToProps = (dispatch) => {
    const { newPeriod } = bindActionCreators(actions, dispatch)
    return { newPeriod: newPeriod };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);