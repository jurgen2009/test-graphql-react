import React from 'react';
import Link from "react-router-dom/Link";
import {GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY} from "../query/СategoryQuery";
import CardHover from "../svg/CardHover.svg";
import OutOfStock from "../svg/OutOfStock.svg";


class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            data1: null,
            loading: true,
            productID: 'apple-airtag',
            category: null,
            galleryIndex: 0,
            attributesItemId: null,
            attributesItemIdSwatch: null,
            attributesItemIdAdd1: null,
            attributesItemIdAdd2: null,
            itemsInCart:[],
        }
    }

    componentDidMount() {
        const firstFetch = fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query:GET_PRODUCTS_BY_CATEGORY, variables: {id: this.props.categoryName}})
        }).then(
            (response) => response.json())

        const secondFetch = fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: GET_PRODUCT, variables: {id: this.state.productID}})
        }).then(
            (response) => response.json())

        const allFetches = Promise.all([firstFetch, secondFetch])

            allFetches.then((response) => {
                this.setState({ data: response[0].data, loading: false })
                this.setState({ data1: response[1].data, loading: false })

        new Promise((resolve, reject) => {
            this.setState({   attributesItemId: response[1].data.product.attributes[0].items[0].id})
            this.setState({   attributesItemIdSwatch: response[1].data.product.attributes[1].items[0].id})
            this.setState({    attributesItemIdAdd1: response[1].data.product.attributes[1].items[0].id})
            this.setState({    attributesItemIdAdd2: response[1].data.product.attributes[1].items[0].id})
 }).catch(function(error) {
        }).then();
    })}

   componentDidUpdate(previousProps, previousState) {
       if (previousProps.categoryName !== this.props.categoryName || previousProps.productID !== this.props.productID)
       {const firstFetch = fetch('http://localhost:4000/', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({query: GET_PRODUCTS_BY_CATEGORY, variables: {id: this.props.categoryName}})
           }).then(
               (response) => response.json())

       const secondFetch = fetch('http://localhost:4000/', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({query: GET_PRODUCT, variables: {id: this.props.productID}})
       }).then(
           (response) => response.json())

       const allFetches = Promise.all([firstFetch, secondFetch])

       allFetches.then((response) => {
           this.setState({data: response[0].data, loading: false})
           this.setState({data1: response[1].data, loading: false})
           new Promise((resolve, reject) => {

               if (response[1].data.product.attributes[0]!== undefined) {
this.setState({   attributesItemId: response[1].data.product.attributes[0].items[0].id})
this.setState({   attributesItemIdSwatch: response[1].data.product.attributes[1].items[0].id})
this.setState({    attributesItemIdAdd1: response[1].data.product.attributes[1].items[0].id})
this.setState({    attributesItemIdAdd2: response[1].data.product.attributes[1].items[0].id})}
               else {this.setState({   attributesItemId: null})
                   this.setState({   attributesItemIdSwatch:  null})
                   this.setState({    attributesItemIdAdd1:  null})
                   this.setState({    attributesItemIdAdd2:  null})}
           }).catch(function(error) {
           }).then();
       })
   }}
    addProductArr = () => {

        console.log(this.props.productID)
        console.log(this.state.data1.product.id)
       this.props.addToCart(
            (this.props.productID===this.state.data1.product.id) ? {
                indexId: this.props.itemsInCart.length,
                id: this.state.data1.product.id,
                name: this.state.data1.product.name,
                brand: this.state.data1.product.brand,
                gallery: this.state.data1.product.gallery,
                prices: this.state.data1.product.prices,
                attributesFull: this.state.data1.product.attributes,
                currency:this.state.data1.product.prices[parseInt(this.props.currentCurrency)].currency.symbol,
                price:this.state.data1.product.prices[parseInt(this.props.currentCurrency)].amount,
                attributesId: this.state.attributesItemId,
                attributesSwatch: this.state.attributesItemIdSwatch,
                attributesAdd1: this.state.attributesItemIdAdd1,
                attributesAdd2: this.state.attributesItemIdAdd2,
                image: this.state.data1.product.gallery[this.state.galleryIndex],
                priceForOne: this.state.data1.product.prices[parseInt(this.props.currentCurrency)].amount,
                quantity: 1,
                imageIndex: 0,
            } : null)
    }
showProductItem=(id)=>{
        console.log(id)
    this.props.showProduct(id)
}

    render() {

        const {loading, data} = this.state
        if (loading) return "Loading...";


        data.category.products.sort((a, b) => {
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
                <div className={this.props.contentState}>
                    <div className="contentCategoryName">{"Category name"}</div>
                    <ul className="contentUnorderedCards" >
                       {data.category.products.map((item, index) => (
                            <li className="contentListCards"  key={index} >
                                <div className="contentCard" onMouseOver={() =>
                                { this.showProductItem(item.id)}}   >
                                <Link to={`/product/${item.id}`}><img
                                    className="contentImg" onMouseOver={() =>
                                { this.showProductItem(item.id)}} key={item.id}
                                    src={item.gallery[0]}
                                    alt={"logo"}/>
                                </Link>
                                    {data.category.products.map(item1 => item1.id===this.props.productID ? item1.inStock === true ?
                                        <img className="cardHoverSvg"  src={CardHover} alt={"logo"}
                                             onClick={() =>
                                             { this.addProductArr()}}
                                        />:
                                            <Link className="OutOfStock" to={`/product/${item.id}`}>
                                                <img src={OutOfStock} alt={"logo"}/>
                                            </Link>: null
                                    )}
                                <div className="contentTextName" onMouseOver={() =>
                                { this.showProductItem(item.id)}}>{item.brand}</div>
                            <div className="contentTextName" onMouseOver={() =>
                            { this.showProductItem(item.id)}}>{item.name}</div>
                                <div className="contentTextPrice" onMouseOver={() =>
                                { this.showProductItem(item.id)}}>{item.prices[this.props.currentCurrency].currency.symbol}
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

