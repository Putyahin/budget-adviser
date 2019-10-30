import React, { Component } from 'react';
import JsChart from '../JsChart';
import './Overview.css';
import { connect } from 'react-redux';
import DatePicker from '../DatePicker';


class Overview extends Component {
    
    render() {
        let income = 0;
        let expenses = 0;
        let incomeAmount = [];
        let expensesAmount = [];
        let incomeLabel = [];
        let expensesLabel = [];
        let incomeLabelArr = [];
        let incomeAmountArr = [];
        let expensesLabelArr = [];
        let expensesAmountArr = [];

        const from = this.props.period.from;
        let to = new Date(this.props.period.to);
        to.setDate(to.getDate() + 1);

        this.props.transactions.map( (element) => {
            const date = element.date;
            if (date < from || date > to) return null;
            if (element.type == 'Income')
            {
                income += +element.amount;
                if (incomeAmount[element.label] === undefined) {
                    incomeAmount[element.label] = 0;
                }
                incomeAmount[element.label] += +element.amount;
                incomeLabel[element.label] = element.label;
            } else {
                expenses += +element.amount;
                if (expensesAmount[element.label] === undefined) {
                    expensesAmount[element.label] = 0;
                }
                expensesAmount[element.label] += +element.amount;
                expensesLabel[element.label] = element.label;
            }

        });
        let j = 0;
        for (let i in incomeLabel) {
            incomeLabelArr[j] = i;
            incomeAmountArr[j] = incomeAmount[i];
            j++;
        }
       
        j = 0;
        for (let i in expensesAmount) {
            expensesLabelArr[j] = i;
            expensesAmountArr[j] = expensesAmount[i];
            j++;
        }
        
        let dataIncome = {
            labels: incomeLabelArr,
            datasets: [{
                label: '',
                data: incomeAmountArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(89,55,127,0.8)',
                    'rgba(168,40,200,0.8)',
                    'rgba(205,43,110,0.8)',
                    'rgba(120,150,200,0.8)',
                    'rgba(90,18,130,0.8)',
                    'rgba(34,190,65,0.8)',
                    'rgba(110,110,110,0.8)',
                    'rgba(190,87,35,0.8)'
                ],
                borderColor: [
                   
                ],
                borderWidth: 3
            }]
        };

        let dataExpenses = {
            labels: expensesLabelArr,
            datasets: [{
                label: '',
                data: expensesAmountArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(89,55,127,0.8)',
                    'rgba(168,40,200,0.8)',
                    'rgba(205,43,110,0.8)',
                    'rgba(120,150,200,0.8)',
                    'rgba(90,18,130,0.8)',
                    'rgba(34,190,65,0.8)',
                    'rgba(110,110,110,0.8)',
                    'rgba(190,87,35,0.8)'
                ],
                borderColor: [
                   
                ],
                borderWidth: 3
            }]
        };

        return (
            <div className = "container">
                <DatePicker />
                <div className = "row">
                    <h5 className = "col-sm" >
                        Total period expenses: {expenses}
                    </h5>
                    <h5 className = "col-sm" >
                        Total period income: {income}
                    </h5>
                </div>
                <div className = "row">
                    <div className = "expenses-chart col-sm">
                        <JsChart data = {dataExpenses}/>
                    </div>
                    <div className = "income-chart col-sm">
                        <JsChart data = {dataIncome}/>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = ({ transactions, period }) => {
    return { transactions, period };
};

export default connect(mapStateToProps)(Overview);