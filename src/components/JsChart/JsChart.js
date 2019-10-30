import React, { Component } from 'react';
import Chart from 'chart.js';
import './JsChart.css';

export default class JsChart extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    
    componentDidMount = () => {
        this.myChart = new Chart(this.canvasRef.current,
            {type: 'doughnut', data:this.props.data,
            options: {maintainAspectRatio: false}});
    };

    componentDidUpdate = () => {
        this.myChart.data = this.props.data;
        this.myChart.update();
    };

    render() {
        return <canvas ref = {this.canvasRef}  />;
    }
}