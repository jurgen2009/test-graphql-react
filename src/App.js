import React from 'react';
import './App.scss'
import Header from './components/Header';
import CategoryPage from './components/СategoryPage';
import ProductPage from "./components/ProductPage";
import CartPageOverlay from "./components/CartPageOverlay";
import Bag from "./components/Bag";
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.updateUpCurrency = this.updateUpCurrency.bind(this);
        this.state = {
            data: null,
            loading: true,
            categoryName: localStorage.getItem('categoryName') === null ? '' : localStorage.getItem('categoryName'),
            productID: localStorage.getItem('productID') === null ? 'apple-airtag' : localStorage.getItem('productID'),
            galleryIndex: 1,
            currentCurrency: localStorage.getItem('currentCurrency') === null ? 0 : localStorage.getItem('currentCurrency'),
            attributesItemId: null,
            attributesItemIdSwatch: null,
            attributesItemIdAdd1: null,
            attributesItemIdAdd2: null,
            items: [],
            amountToPay: null,
            itemsInCart: JSON.parse(localStorage.getItem('itemsInCart')) === null ? [] : JSON.parse(localStorage.getItem('itemsInCart')),
            itemsInOrder: [],
            homeContainerState: 'homeContainerClosed',
            overlay: 'overlayClosed',
            contentState: 'content',
        }
    }

    addToCart = (arr) => {
        const updatedCart = [...this.state.itemsInCart];//copying an array of products in the cart
        const updatedItemIndex = updatedCart.findIndex(res => res.name + res.attributesId + res.attributesSwatch // check if there is the same product in the cart
            + res.attributesAdd1 + res.attributesAdd2 === arr.name + arr.attributesId + arr.attributesSwatch + arr.attributesAdd1 + arr.attributesAdd2);
        if (updatedItemIndex === -1)//if the same product is not found, then this product added to the cart and to the localstorage
        {
            this.setState({itemsInCart: [...this.state.itemsInCart, arr]});
            localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart, arr]))
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]//if the same product is found, the variable is set
            };
            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === arr.id)// find the id for prices in the array from the database
            const updatedPrice = this.state.itemsInCart[updatedPriceIndex].prices.map(price => {
                if (price.currency.symbol === updatedItem.currency) return price.amount
                else
                    return null
            })// price must be displayed in the current currency
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
            const imgControl = updatedItem.gallery.length
            if (updatedItem.imageIndex < (imgControl - 1)) {
                updatedItem.imageIndex++
            } else {
                updatedItem.imageIndex = 0
            }
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
            if (updatedItem.imageIndex < (1)) {
                updatedItem.imageIndex = 0
            } else {
                updatedItem.imageIndex--
            }
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
    };

    createOrder = (value) => {
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
            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === index.id)// find the id for prices in the array from the database
            const updatedPrice = this.state.itemsInCart[updatedPriceIndex].prices.map(price => { // price must be displayed in the current currency
                if (price.currency.symbol === updatedItem.currency) return price.amount
                else
                    return null
            })// find the price in the array from the database corresponding to the currency of the product
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


        updatedItem.quantity--;
        if (updatedItem.quantity <= 0) {
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === index.id)
            const updatedPrice = this.state.itemsInCart[updatedPriceIndex].prices[this.state.currentCurrency].amount
            updatedItem.price = updatedItem.price - updatedPrice;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);

        setTimeout(() => {
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }, 300);
    };

    showProduct = (value) => {
        console.log(value)
         this.setState({productID: value})
        localStorage.setItem('productID', value)
    }

    updateUpCurrency = async (value) => {
      this.setState({currentCurrency: value})// value from header number 0-4
       localStorage.setItem('currentCurrency', (value))
        const updatedItems = this.state.itemsInCart.filter(res => this.state.itemsInCart.map(item => item.id.includes(res.id)))
//copying an array of products in the cart
        console.log(updatedItems)

        for (let i = 0; i < updatedItems.length; i++) {
            updatedItems[i].currency = updatedItems[i].prices[value].currency.symbol
            console.log(updatedItems[i].currency)
            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === updatedItems[i].id)
            console.log(updatedPriceIndex)
            updatedItems[i].priceForOne = this.state.itemsInCart.findIndex(item => item.id === updatedItems[i].id)
            const updatedPrice = this.state.itemsInCart[i].prices.map(item => {
                if (item.currency.symbol === updatedItems[i].currency) return item.amount
                else
                    return console.log(item.amount) //dummy return, needed for the function to work correctly
            })

            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }
            console.log(updatedPrice)
            updatedItems[i].currency = updatedItems[i].prices[value].currency.symbol
            updatedItems[i].price = updatedPrice.sort(compareNumeric)[0] * updatedItems[i].quantity;
            updatedItems[i].priceForOne = updatedPrice.sort(compareNumeric)[0]
                 }

        this.setState(prevState => ({...prevState, itemsInCart: updatedItems}));

        (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));

    }


    updateDataName = (value) => {
        this.setState({categoryName: value})
        localStorage.setItem('categoryName', value)
    }

    updateGallery = (index) => {
        this.setState({galleryIndex: index})
    }

    updateAttributesItemId = (id) => {
        this.setState({attributesItemId: id})
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

    homeContainerChange=(value)=> {
        this.setState({homeContainerState: value})
    }

    overlayChange=(value)=> {
        this.setState({overlay: value})
    }

    contentChange=(value)=> {
        this.setState({contentState: value})
    }

    render() {


                return (
                    <div className={this.state.homeContainerState}>
                        <Switch>
                            <Route exact path={[`/${localStorage.getItem('categoryName') === null ?
                                this.state.categoryName : localStorage.getItem('categoryName')}`, '']} render={() =>
                                <CategoryPage
                                    categoryName={this.state.categoryName}
                                    showProduct={this.showProduct}
                                    currentCurrency={this.state.currentCurrency}
                                    addToCart={this.addToCart}
                                    productID={this.state.productID}
                                    itemsInCart={this.state.itemsInCart}
                                    contentState={this.state.contentState}
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
                                    addToCart={this.addToCart}
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
                            updateDataName={this.updateDataName}
                            data1={this.state}
                            updateUpCurrency={this.updateUpCurrency}
                            quantity={this.state.quantity}
                            amountToPay={this.state.amountToPay}
                            itemsInCart={this.state.itemsInCart}
                            currentCurrency={this.state.currentCurrency}
                            homeContainerChange={this.homeContainerChange}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            overlay={this.state.overlay}
                            contentState={this.state.contentState}
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
                            homeContainerChange={this.homeContainerChange}
                            overlay={this.state.overlay}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            contentState={this.state.contentState}
                        />
                        </div>
                )
            }

}
export default App;
