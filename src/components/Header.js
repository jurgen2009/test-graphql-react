import React from 'react';
import '../App.js'
import {GET_ALL_CATEGORIES} from '../query/СategoryQuery.js'
import CartPage from "./CartPage";
import Currency from "./Currency";
import svgBack from '../svg/Backout.svg';
import Link from "react-router-dom/Link";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handlerCategory = this.handlerCategory.bind(this)
        this.changeCurrency = this.changeCurrency.bind(this)
        this.state = {
            data: null,
            data1: null,
            loading: true,
            category: null,
            total: 0.00,
            itemsInCart: this.props.itemsInCart,
            currentCurrency: localStorage.getItem('currentCurrency')===null ? 0 : localStorage.getItem('currentCurrency'),
        } }

    componentDidMount () {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: GET_ALL_CATEGORIES })
        }).then(
            (response) => response.json()
        ).then((response) => {
            this.setState({ data: response.data, loading: false })
        })
    }

    handlerCategory = (index) => { this.props.updateData(this.state.category=index)}

    handlerCategoryName = (index) => { this.props.updateDataName(this.state.categoryName=index)}

    updateCurrency = (value) => {this.setState({currentCurrency: value })}

    changeCurrency = async (value) => {this.props.updateUpCurrency(this.state.currentCurrency=value)}

    render() {
        const { loading, data} = this.state
        console.log(data)
        if (loading) return "Loading...";
        return (
            <header>
                <ul id="nav">
                    {data.categories.map((item, index) => (
                        <li key={item.name}><Link to={`/${item.name}`} className="label" key={index} onClick={() =>
                        { this.handlerCategory(index); this.handlerCategoryName(item.name)}}>
                            {item.name}</Link></li>
                    ))}</ul>
                <div className="backOutButton">
                    <Link to={`/`} id="backout-button">
                        <img src={svgBack} alt={"logo"}/>
                    </Link>
                </div>
                <div className="checkOut">
                    <button onClick={() => {
                        this.changeCurrency(this.state.currentCurrency)
                    }}>
                        <Currency
                        updateCurrency={this.updateCurrency}
                        currentCurrency={this.state.currentCurrency}/>
                        </button>
                    <div className="checkOutTotal">
                        <CartPage
                            itemsInCart={this.props.itemsInCart}/>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header
