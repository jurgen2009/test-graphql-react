import React from 'react';
import '../App.js'
import {GET_ALL_CATEGORIES} from '../query/СategoryQuery.js'
import CartPage from "./CartPage";
import svgBack from '../svg/Backout.svg';
import Link from "react-router-dom/Link";
import ArrowUp from "../svg/ArrowUp.svg";
import ArrowDown from "../svg/ArrowDown.svg";
import {GET_CURRENCY} from "../query/СategoryQuery";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handlerCategoryName = this.handlerCategoryName.bind(this)
        this.changeCurrency = this.changeCurrency.bind(this)
        this.homeContainerChange = this.homeContainerChange.bind(this) // needed for bind function with the context of this component, otherwise this function doesn't get props
        this.overlayChange = this.overlayChange.bind(this)
        this.contentChange = this.contentChange.bind(this)
        this.state = {
            data: [],
            dataC: [],
            loading: true,
            category: null,
            total: 0.00,
            itemsInCart: this.props.itemsInCart,
            currentCurrency: localStorage.getItem('currentCurrency')===null ? 0 : localStorage.getItem('currentCurrency'),
            labels: [],
            showLabels: false,
            selectedLabels: localStorage.getItem('selectedCurrency')===null ? "$" : localStorage.getItem('selectedCurrency'),
            overlay:'overlayClosed',
            homeContainerChange: 'homeContainerClosed',
            contentChange: 'content'
        } }


    componentDidMount() {
        const firstFetch =  fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: GET_ALL_CATEGORIES })
        }).then(
            (response) => response.json()
        )

        const secondFetch = fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: GET_CURRENCY})
        }).then(
            (response) => response.json()
        )

        const allFetches = Promise.all([firstFetch, secondFetch])

        allFetches.then((response) => {
            this.setState({ data: response[0].data, loading: false,  })
            this.setState({ dataC: response[1].data, loading: false })

        })}

    dropDown = () => {if(this.props.overlay !== 'overlayOpened')
        this.setState(prevState => ({
            showLabels: !prevState.showLabels}
        ));
    };

    selectItem =   (item, index) =>  {
         this.setState({
            selectedLabels: item.symbol,
            showLabels: false,
            currentCurrency: index
        });
        localStorage.setItem('currentCurrency', (index))
        localStorage.setItem('selectedCurrency', (item.symbol))
    };

    handlerCategoryName = (index) => { this.props.updateDataName(index)}


    changeCurrency = (value) => {
        this.props.updateUpCurrency(value)}

    homeContainerChange () {if (this.props.overlay === 'overlayOpened'){
        this.props.homeContainerChange('homeContainerClosed')} else {
        this.props.homeContainerChange('homeContainerOpened')}}

    overlayChange () {if (this.props.overlay === 'overlayOpened'){
        this.props.overlayChange('overlayClosed')} else {
        this.props.overlayChange('overlayOpened')}}

    contentChange () {if (this.props.contentState === 'contentFixed'){
        this.props.contentChange('content')} else {
        this.props.contentChange('contentFixed')}}

    render() {
        let dataA = Object.keys(this.state.dataC).map((key) => [Number(key), this.state.dataC[key]])
        // currency fetched object to array
        const { loading, data} = this.state


        if (loading) return "Loading...";
        return (
            <header>


                <ul id="nav">
                    {data.categories.map((item, index) => (
                        <li key={item.name}><Link to={`/${item.name}`} className="label" key={index} onClick={() =>
                        {this.handlerCategoryName(item.name)}}>
                            {item.name}</Link></li>
                    ))}</ul>
                <div className="backOutButton">
                    <Link to={`/`} id="backout-button">
                        <img src={svgBack} alt={"logo"}/>
                    </Link>
                </div>
                <div className="checkOut">
                    <button>
                        <div className="select-box--box">
                            <div className="select-box--container">
                                <div className="select-box--selected-item">
                                   {this.state.selectedLabels}
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
                                {dataA.map(res=>res[1].map((item, index) => (
                                        <div
                                            key={item.id}

                                            onClick={() =>  {this.selectItem(item, index); this.changeCurrency(index)}}
                                            className={this.state.selectedLabels === item ? "selected" : ""}
                                        >
                                            {item.symbol}{' '}{item.label}
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                        </button>
                    <div className="checkOutTotal">
                        <CartPage
                            itemsInCart={this.props.itemsInCart}
                            showLabels={this.state.showLabels}
                            homeContainerChange={this.homeContainerChange}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            overlay={this.props.overlay}
                        />
                    </div>
                </div>
            </header>
        );
    }
}
export default Header
