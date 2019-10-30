import React, { Component } from 'react';
import errorImg from './error_logo.png';

export default class ErrorGlobal extends Component {
   
    state = {
        isError: false
    };

    componentDidCatch = () => {
        this.setState({
            isError: true
        });
    };

    render() {
        const isError = this.state.isError;
        if (isError) {
            return (
                <div>
                    <div>
                        <img src={errorImg} />
                    </div>
                    <div>
                        Oops,something went wrong. Try using your actions later.
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}