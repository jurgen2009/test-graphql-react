import React from 'react';
import './App.scss'
import Header from './components/Header';
import CategoryPage from './components/СategoryPage';
import ProductPage from "./components/ProductPage";
import CartPageOverlay from "./components/CartPageOverlay";
import {GET_ALL_PRODUCTS} from "./query/СategoryQuery";
import Bag from "./components/Bag";
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.updateUpCurrency=this.updateUpCurrency.bind(this);
        this.state = {
            data: null,
            loading: true,
            category: localStorage.getItem('category')===null ? 0 : localStorage.getItem('category'),
            categoryName: localStorage.getItem('categoryName')===null ? '' : localStorage.getItem('categoryName'),
            productID: localStorage.getItem('productID')===null ? 'ps-5' : localStorage.getItem('productID'),
            galleryIndex: 1,
            currentCurrency: localStorage.getItem('currentCurrency')===null ? 0 : localStorage.getItem('currentCurrency'),
            attributesItemId: null,
            attributesItemIdSwatch: null,
            attributesItemIdAdd1: null,
            attributesItemIdAdd2: null,
            items: [],
            amountToPay: null,
            itemsInCart: JSON.parse(localStorage.getItem('itemsInCart'))===null ? [] : JSON.parse(localStorage.getItem('itemsInCart')),
            itemsInOrder: []
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
            this.setState({
                items: response.data.categories[0].products,
                loading: false
            })
        })
    }

    addToCart = (arr) => {
        const updatedCart = [...this.state.itemsInCart];//copying an array of products in the cart
        const updatedItemIndex = updatedCart.findIndex(res => res.name+res.attributesId+res.attributesSwatch // check if there is the same product in the cart
            +res.attributesAdd1+res.attributesAdd2 === arr.name+arr.attributesId+arr.attributesSwatch+arr.attributesAdd1+arr.attributesAdd2);
        if (updatedItemIndex===-1)//if the same product is not found, then this product added to the cart and to the localstorage
        {this.setState({itemsInCart: [...this.state.itemsInCart, arr]});
            localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart, arr]))}
        else { const updatedItem = {
            ...updatedCart[updatedItemIndex]//if the same product is found, the variable is set
        };
            const updatedPriceIndex = this.state.items.findIndex(item => item.id === arr.id)// find the id for prices in the array from the database
            const updatedPrice = this.state.items[updatedPriceIndex].prices.map(price=> {
                if (price.currency.symbol === updatedItem.currency) return price.amount})// price must be displayed in the current currency
            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }// sorting the array in ascending order so that the resulting price in the corresponding currency is under the index 0
            updatedItem.quantity++;//if the same product is found, increase the quantity of product by one
            updatedItem.price = updatedPrice.sort(compareNumeric)[0] * updatedItem.quantity;// total cost = price with sorting * quantity
            updatedCart[updatedItemIndex] = updatedItem;//replacing an element with a new value
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart})); //cart and localstorage updating
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }

    }


    bagArrowRight = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);


        if (updatedItemIndex < 0) {
            updatedCart.push({...index, imageIndex: 0});
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            console.log(updatedItem)
            const imgControl= updatedItem.gallery.length
            if (updatedItem.imageIndex < (imgControl-1)) {updatedItem.imageIndex++} else {updatedItem.imageIndex=0}
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
    };

    bagArrowLeft = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);
        if (updatedItemIndex < 0) {
            updatedCart.push({...index, imageIndex: 0});
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            if (updatedItem.imageIndex < (1)) {updatedItem.imageIndex=0} else {updatedItem.imageIndex--}
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
    };

    createOrder = (value) =>{
        localStorage.setItem('cartItems', this.state.itemsInOrder)
        this.setState({cartItems: [...this.state.itemsInOrder, value]});
    }

    increaseQuantity = (index) => {
        const updatedCart = [...this.state.itemsInCart];//copying an array
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);//find the index match in the array and save the index number

        if (updatedItemIndex < 0) {// if there is no index, add the product to the array in quantity = 1
            updatedCart.push({...index, quantity: 1});
        } else {
            const updatedItem = { // if there is an index, save the product
                ...updatedCart[updatedItemIndex]
            };
            const updatedPriceIndex = this.state.items.findIndex(item => item.id === index.id)// find the id for prices in the array from the database
            const updatedPrice = this.state.items[updatedPriceIndex].prices.map(price=> { // price must be displayed in the current currency
                if (price.currency.symbol === updatedItem.currency) return price.amount})// find the price in the array from the database corresponding to the currency of the product
            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }// sorting the array in ascending order so that the resulting price in the corresponding currency is under the index 0
            updatedItem.quantity++; // increase the quantity of product by one
            updatedItem.price = updatedPrice.sort(compareNumeric)[0] * updatedItem.quantity; // total cost = price with sorting * quantity
            updatedCart[updatedItemIndex] = updatedItem;//replacing an element with a new value
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
        setTimeout(() => {
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }, 300);
    };

    decreaseQuantity = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);
        const updatedItem = {
            ...updatedCart[updatedItemIndex]
        };
        console.log(updatedCart)
        console.log(updatedItemIndex)
        console.log(updatedItem.attributesId)

        updatedItem.quantity--;
        if (updatedItem.quantity <= 0) {
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
            const updatedPriceIndex = this.state.items.findIndex(item => item.id === index.id)
            const updatedPrice = this.state.items[updatedPriceIndex].prices[this.state.currentCurrency].amount
            updatedItem.price = updatedItem.price-updatedPrice;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);

        setTimeout(() => {
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }, 300);
    };



    showProduct = (value) => {
        this.setState({productID: value})
        localStorage.setItem('productID', value)
    }


    updateUpCurrency = async (value) => {
        setTimeout(async() => {
           await this.setState({currentCurrency: value})
        }, 300);

        this.setState({currentCurrency: value})
            setTimeout(async() => {
                (await localStorage.setItem('currentCurrency', (value)));
            }, 300);

            const updatedItems = await this.state.itemsInCart.filter(res => this.state.items.map(item => item.id.includes(res.id)))



             for (let i = 0; i < updatedItems.length; i++) {
                console.log(updatedItems[i].prices)
                updatedItems[i].currency =  await updatedItems[i].prices[parseInt(this.state.currentCurrency)].currency.symbol
                updatedItems[i].price =  await updatedItems[i].prices[parseInt(this.state.currentCurrency)].amount
                const updatedPriceIndex = await this.state.items.findIndex(item => item.id === updatedItems[i].id)
                const updatedPrice = await this.state.items[updatedPriceIndex].prices.map(item => {
                    if (item.currency.symbol === updatedItems[i].currency) return item.amount
                })
                function compareNumeric(a, b) {
                    if (a > b) return 1;
                    if (a === b) return 0;
                    if (a < b) return -1;
                }
                updatedItems[i].price = await updatedPrice.sort(compareNumeric)[0] * updatedItems[i].quantity;
            }


            this.setState(prevState => ({...prevState, itemsInCart: updatedItems}));

            setTimeout(() => {
                (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
            }, 300);


        }

    updateData = (value) => {
        this.setState({category: value})
        localStorage.setItem('category', value)
    }

    updateDataName = (value) => {
        this.setState({categoryName: value})
        localStorage.setItem('categoryName', value)
    }

    updateGallery = (value) => {
        this.setState({galleryIndex: value})
    }

    updateAttributesItemId = (value) => {
        this.setState({attributesItemId: value})
    }

    updateAttributesItemIdSwatch = (value) => {
        this.setState({attributesItemIdSwatch: value})
    }

    updateAttributesItemIdAdd1 = (value) => {
        this.setState({attributesItemIdAdd1: value})
    }

    updateAttributesItemIdAdd2 = (value) => {
        this.setState({attributesItemIdAdd2: value})
    }




    render() {
        return (
            <div className="homeContainer">
                <Switch>
                    <Route exact path={[`/${localStorage.getItem('categoryName')===null ? 
                        this.state.categoryName : localStorage.getItem('categoryName')}`, '']} render={() =>
                            <CategoryPage
                                category={this.state.category}
                                showProduct={this.showProduct}
                                currentCurrency={this.state.currentCurrency}
                                items={this.state.items}
                                addToCart={this.addToCart}
                            />
                    }
                    />

                    <Route path={`/product/${localStorage.getItem('productID')}`} render={() =>
                            <ProductPage
                                updateGallery={this.updateGallery}
                                productID={this.state.productID}
                                currentCurrency={this.state.currentCurrency}
                                updateAttributesItemId={this.updateAttributesItemId}
                                updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                                addToCart={this.addToCart} items={this.state.items}
                                updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                                updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                                itemsInCart={this.state.itemsInCart}
                                showProduct={this.showProduct}
                            />
                    }
                    />

                    <Route path="/bag" render={() =>
                        <Bag
                            data={this.state}
                            itemsInCart={this.state.itemsInCart}
                            itemsInOrder={this.state.itemsInOrder}
                            createOrder={this.createOrder}
                            updateGallery={this.updateGallery}
                            productID={this.state.productID}
                            currentCurrency={this.state.currentCurrency}
                            updateAttributesItemId={this.updateAttributesItemId}
                            updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                            addToCart={this.addToCart} items={this.state.items}
                            increaseQuantity={this.increaseQuantity}
                            decreaseQuantity={this.decreaseQuantity}
                            updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                            updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                            attributesItemIdAdd1={this.state.attributesItemIdAdd1}
                            attributesItemIdAdd2={this.state.attributesItemIdAdd2}
                            amountToPay={this.state.amountToPay}
                            bagArrowRight={this.bagArrowRight}
                            bagArrowLeft={this.bagArrowLeft}
                        />
                    }
                    />
                </Switch>
                <Header
                    updateData={this.updateData}
                    updateDataName={this.updateDataName}
                    updateUpCurrency={this.updateUpCurrency}
                    quantity={this.state.quantity}
                    amountToPay={this.state.amountToPay}
                    itemsInCart={this.state.itemsInCart}
                    currentCurrency={this.state.currentCurrency}
                />

                <CartPageOverlay
                    data={this.state}
                    itemsInCart={this.state.itemsInCart}
                    updateGallery={this.updateGallery}
                    productID={this.state.productID}
                    currentCurrency={this.state.currentCurrency}
                    updateAttributesItemId={this.updateAttributesItemId}
                    updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                    addToCart={this.addToCart} items={this.state.items}
                    increaseQuantity={this.increaseQuantity}
                    decreaseQuantity={this.decreaseQuantity}
                    updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                    updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                    attributesItemIdAdd1={this.state.attributesItemIdAdd1}
                    attributesItemIdAdd2={this.state.attributesItemIdAdd2}
                    amountToPay={this.state.amountToPay}
                />
            </div>
        );

    }
}
export default App;
