import React from 'react';
import '../App.js'
import {GET_CURRENCY} from "../query/СategoryQuery";

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.handlerCurrency = this.handlerCurrency.bind(this)
        this.state = {

            data: null,
            loading: true,
            } }

    componentDidMount () {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: GET_CURRENCY})
        }).then(
            (response) => response.json()
        ).then((response) => {
            this.setState({ data: response.data, loading: false })
        })
    }

    handlerCurrency = (event) => { this.props.updateCurrency(this.state.currentCurrency=event.target.value)}

    render() {
        const {loading, data} = this.state

        if (loading) return "Loading...";

        return (

            <div className="currencyChange">
                <form onChange={this.handlerCurrency}>
                    <label>
                        <select value={this.value} onChange={this.handlerCurrency}>
                            <option value={localStorage.getItem('currentCurrency')}>{data.currencies[this.props.currentCurrency].symbol}</option>
                            {data.currencies.map((item, index) => (
                                <option key={index} value={index}>{item.symbol}{" "}{item.label}</option>
                            ))}
                            ))}
                        </select>
                    </label>
                </form>
            </div>
        );
    }
}



export default Currency

