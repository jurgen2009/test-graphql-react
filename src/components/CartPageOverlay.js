import React from 'react'
import Link from "react-router-dom/Link";


class CartPageOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.state = {
                    productID: null,
                    data: [],
                    loading: true,
                    category: null,
                    galleryIndex: 1,
                    attributesItemId: null,
                    attributesItemIdSwatch: null,
                    attributesItemIdAdd1: null,
                    attributesItemIdAdd2: null,
                    itemsInCart:[],
                    attributesFull: [],
                    amountToPay: 0,

            }
    }

    closeOverlay =() =>{
        this.props.homeContainerChange('homeContainerClosed')
        this.props.overlayChange('overlayClosed')
        this.props.contentChange('content')
    }

    handlerIncreaseQuantity= (id) =>{this.props.increaseQuantity(id)}

    handlerDecreaseQuantity= (id) =>{this.props.decreaseQuantity(id)  }

    handlerCheckout = () => {
        localStorage.removeItem('itemsInCart')
           }

    quantityCounter=() => {
        let x
        return this.props.itemsInCart.map(res=>x+=res.quantity, x=0).reverse()[0]
    }

    render() {
        let amountToPay = 0;
        let y
        amountToPay = this.props.itemsInCart.map(res=>y+=res.priceForOne*res.quantity, y=0).reverse()[0]!== undefined ?
            this.props.itemsInCart.map(res=>y+=res.priceForOne*res.quantity, y=0).reverse()[0] : 0
        return (
            <div className={this.props.overlay} onClick={this.closeOverlay}>
                <div id="shopping-cart" onClick={e=>e.stopPropagation()}>
                    <div id="cart-header">
                        My Bag, {this.quantityCounter()} items
                    </div>
                        <ul>
                            {this.props.itemsInCart.map((item, index) => (
                                <li key={index}>

                                    <div className="groupContent">
                                        <div className="groupContentImgSC1">
                                            <div className="shoppingCartItemList">
                                                <div className="shoppingCartItemListTextName">{item.brand}</div>
                                                <div className="shoppingCartItemListTextName">{item.name}</div>

                                                <div className="shoppingCartItemListTextPrice">{item.currency + item.priceForOne}</div>{" "}


                                                <div className="galleryAttributesSC">

                                                    <div className="caption">{item.attributesFull.map(
                                                    res=>res.type==='text' && res.id !=='With USB 3 ports' && res.id !=='Touch ID in keyboard' ?
                                                        res.id+":": "")}</div>


                                                    {item.attributesFull.map((item1)=>item1.type==='text' &&
                                                    item1.id !=='With USB 3 ports' && item1.id !=='Touch ID in keyboard' ?
                                                        item1.items.map(item2=>{
                                                            return this.props.itemsInCart.attributesId!==null ?

                                                                (<div key={item2.id} className={
                                                                      item.attributesId===item2.id ? "attributesItemSCBlack" : "attributesItemSC"}>
                                                                    <div className="attributesItemSCtext">{item2.value}</div>
                                                                </div>) :
                                                                (<div className="attributesItemSC" key={item2.id}  >
                                                                    <div className="attributesItemSCtext">{item2.value}</div>
                                                                </div>)}) : null) }
                                                    <br/>
                                                </div>
                                                <div className={item.attributesFull.map((item1)=>item1.items.map(item2=>item2.id!=='Color' ?
                                                    "galleryAttributesSwatchSCNone" : "galleryAttributesSwatchSC"))}>

                                                    <div className="caption">{item.attributesFull.map(res=>res.type==='swatch' ?  res.id+":": "")}</div>
                                                    {item.attributesFull.map((item1, index)=>(item1.type==='swatch') ? item1.items.map(item2=>{

                                                            return this.props.itemsInCart.attributesSwatch!==null ?
                                                                (<div className="attributesItemSwatchSelectedSC" key={item2.id}
                                                                      style={item.attributesSwatch === item2.id ?
                                                                          {
                                                                              backgroundColor: item2.id,
                                                                              outlineStyle: 'solid',
                                                                              outlineColor: 'lawngreen',
                                                                              outlineOffset: '2px',
                                                                              outlineWidth: '2px'
                                                                          } : {backgroundColor: item2.id}} />) :
                                                                (<div className="attributesItemSwatch"
                                                                      key={item2.id}
                                                                      style={{backgroundColor: item2.id}} >{""}
                                                                </div>)
                                                        }) : null
                                                    )}
                                                    <br/>
                                                </div>
                                                <div className="galleryAttributesAdd1SC">
                                                    <div className={item.attributesFull.length<3 ?
                                                        "galleryAttributesAdd1SCCaptionNone" : "galleryAttributesAdd1SCCaption"}>

                                                        {item.attributesFull.map((item1, index)=>
                                                    {if (index === 1) {return item1.id+":"}
                                                    else
                                                    {return null


                                                    }})}
                                                    </div>
                                                    {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                                        return this.props.itemsInCart.map(res=>res.attributesAdd1) !==null ?
                                                            (<div key={item2.id} className={item.attributesAdd1===item2.id ?
                                                                "attributesItemAdd1SCBlack" : "attributesItemAdd1SC"}>
                                                    <div className="attributesItemSCtext">{item2.id}
                                                    </div>
                                                            </div>) : (<div className="attributesItemAdd1SC" key={item2.id}>
                                                                <div className="attributesItemSCtext">{item2.id}</div></div>)}) : null) }
                                                    <br/>
                                                </div>

                                                <div className="galleryAttributesAdd2SC">
                                                    <div className={item.attributesFull.length<3 ?
                                                        "galleryAttributesAdd2SCCaptionNone" : "galleryAttributesAdd2SCCaption"}>{item.attributesFull.map((item1, index)=>
                                                    {if (index === 2) {return item1.id+":"}
                                                    else
                                                    {return null


                                                    }})}</div>
                                                    {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))
                                                        ? item1.items.map(item2=>{
                                                            return this.props.itemsInCart.map(res=>res.attributesAdd2) !==null ?
                                                                (<div key={item2.id} className={item.attributesAdd2===item2.id ?
                                                                    "attributesItemAdd2SCBlack" : "attributesItemAdd2SC"}>
                                                                    <div className="attributesItemSCtext">{item2.id}</div>
                                                                </div>) : (<div className="attributesItemAdd2SC" key={item2.id}>
                                                                    <div className="attributesItemSCtext">{item2.id}</div></div>)}) : null) }
                                                    <br/>
                                                </div>
                                            </div></div>


                                        <div className="groupContentImgSC2">
                                            <div className="plus_minusContentImgSC">
                                                <div className="plusContentImgSC" onClick={() => {this.handlerIncreaseQuantity({
                                                    indexId:this.props.itemsInCart[index].indexId,
                                                    id: this.props.itemsInCart[index].id,
                                                    name: this.props.itemsInCart[index].name,
                                                    brand: this.props.itemsInCart[index].brand,
                                                    gallery: this.props.itemsInCart[index].gallery,
                                                    prices: this.props.itemsInCart[index].prices,
                                                    attributesFull: this.props.itemsInCart[index].attributesFull,
                                                    currency:this.props.itemsInCart[index].currency,
                                                    price:this.props.itemsInCart[index].price*this.props.itemsInCart[index].quantity,
                                                    attributesId: this.props.itemsInCart[index].attributesId,
                                                    attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                    attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                    attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                    image: this.props.itemsInCart[index].image,
                                                    priceForOne: this.props.itemsInCart[index].price,
                                                })}}>{"+"}</div>
                                                <div className="countContentImgSC">
                                                    <span className="countContentImgSCNumber">{this.props.itemsInCart[index].quantity}</span></div>
                                                <div className="minusContentImgSC"
                                                     onClick={() => {this.handlerDecreaseQuantity(
                                                         {
                                                             indexId:this.props.itemsInCart[index].indexId,
                                                             id: this.props.itemsInCart[index].id,
                                                             name: this.props.itemsInCart[index].name,
                                                             brand: this.props.itemsInCart[index].brand,
                                                             gallery: this.props.itemsInCart[index].gallery,
                                                             prices: this.props.itemsInCart[index].prices,
                                                             attributesFull: this.props.itemsInCart[index].attributesFull,
                                                             currency:this.props.itemsInCart[index].currency,
                                                             price:this.props.itemsInCart[index].price*this.props.itemsInCart[index].quantity,
                                                             attributesId: this.props.itemsInCart[index].attributesId,
                                                             attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                             attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                             attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                             image: this.props.itemsInCart[index].image,
                                                             priceForOne: this.props.itemsInCart[index].price,
                                                         })}}>{"-"}</div>
                                            </div>
                                            <img className="contentImgSC"
                                                 key={item.id}
                                                 src={item.image}
                                                 alt={"logo"}/></div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    <div id="empty-cart">{(this.props.itemsInCart.length === 0) ? "Shopping cart is empty" : ""}</div>
                    <div id="totals">
                        <div className="totals1">
                            <div className="totalsText">{"Total: "}</div>
                            <div>{this.props.itemsInCart.map((res, index )=>
                            {if(index===0) return res.currency
                            else
                                return null
                            })}{amountToPay.toFixed(2)}</div>
                        </div>
                        <div className="totals2"><Link to="/bag" className="viewLink"
                                                       onClick={() => {this.handlerOpenMyBag(false)}}>
                            <button id="viewBag"><span className="viewBagText">{"VIEW BAG"}</span></button>
                        </Link>
                            <button id="checkout"
                                    className="viewLink"
                                    onClick={() =>  {document.location.reload(localStorage.removeItem('itemsInCart')) }}
                                    disabled={this.props.itemsInCart.length === 0} >
                                <span className="checkOutText">{"CHECK OUT"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartPageOverlay