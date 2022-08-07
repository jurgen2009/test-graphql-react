import React from 'react';
import '../App.js'
import {GET_CURRENCY} from "../query/СategoryQuery";
import ArrowUp from "../svg/ArrowUp.svg";
import ArrowDown from "../svg/ArrowDown.svg";

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentCurrency: 0,
            labels: this.props.labels || [],
            showLabels: false,
            selectedLabels: this.props.labels && this.props.labels[0],
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

    dropDown = () => {
        this.setState(prevState => ({
            showLabels: !prevState.showLabels
        }));
    };

    selectItem = async (item, index) =>  {
        console.log(index)
         this.setState({
            selectedLabels: item,
            showLabels: false,
            currentCurrency: index
        });

      await this.props.updateCurrency(index)
    };


    render() {
        const {loading, data} = this.state

        if (loading) return "Loading...";

        return (
            <div className="select-box--box">
                <div className="select-box--container">
                    <div className="select-box--selected-item">
                        {this.state.selectedLabels.symbol}
                    </div>
                    <div className="select-box--arrow" onClick={this.dropDown}>
            <img src={`${
                this.state.showLabels
                    ? ArrowUp
                    : ArrowDown
            }`} alt=""/>

                    </div>

                    <div
                        style={{ display: this.state.showLabels ? "block" : "none" }}
                        className={"select-box--items"}
                    >
                        {data.currencies.map((item, index) => (
                            <div
                                key={item.id}

                                onClick={() =>  this.selectItem(item, index)}
                                className={this.state.selectedLabels === item ? "selected" : ""}
                            >
                                {item.symbol}{' '}{item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}



export default Currency

