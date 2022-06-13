import React from 'react';
import {GET_ALL_PRODUCTS} from '../query/СategoryQuery.js'
import Link from "react-router-dom/Link";


class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            productID: null,
        }
    }


    componentDidMount() {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: GET_ALL_PRODUCTS})
        }).then(
            (response) => response.json()
        ).then((response) => {
            this.setState({data: response.data, loading: false})
        })
    }

showProductItem=(id)=>{
    this.props.showProduct(this.state.productID=id)
}

    render() {

        const {loading, data} = this.state
        if (loading) return "Loading...";

        data.categories[this.props.category].products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })


        return (

                <div className="content">
                    <div className="contentCategoryName">{"Category name"}</div>
                    <ul className="contentUnorderedCards">
                        {data.categories[this.props.category].products.map((item, index) => (
                            <li className="contentListCards" key={index} ><div className="contentCard">
                                <Link to={`/product/${item.id}`} onClick={() =>
                                { this.showProductItem(item.id)}}><img
                                    className="contentImg" key={item.id}
                                    src={item.gallery[0]}
                                    alt={"logo"}/></Link>
                            <div className="contentTextName">{item.name}</div>
                                <div className="contentTextPrice">{item.prices[this.props.currentCurrency].currency.symbol}
                                {item.prices[this.props.currentCurrency].amount}</div>
                            </div>
                            </li>
                        ))}
                    </ul>
                </div>

        );
    }
}

export default CategoryPage

