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
                    overlay: 'auto'
            }
    }

    closeOverlay =() =>{
        this.setState({ overlay: 'auto' });
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('#root > div').style.position = 'relative'
    }


    handlerAttributesItem = (id)=> {if (this.props.attributesItemId!==id)
    {this.props.updateAttributesItemId(this.state.attributesItemId=id)}}

    handlerAttributesItemSwatch = (id)=> {if (this.props.attributesItemIdSwatch!==id)
    {this.props.updateAttributesItemIdSwatch(this.state.attributesItemIdSwatch=id)}}

    handlerAttributesItemAdd1 = (id)=> {if (this.props.attributesItemIdAdd1!==id)
    {this.props.updateAttributesItemIdAdd1(this.state.attributesItemIdAdd1=id)}}

    handlerAttributesItemAdd2 = (id)=> {if (this.props.attributesItemIdAdd2!==id)
    {this.props.updateAttributesItemIdAdd2(this.state.attributesItemIdAdd2=id)}}

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
        amountToPay = this.props.itemsInCart.map(res=>y+=res.price, y=0).reverse()[0]!== undefined ?
            this.props.itemsInCart.map(res=>y+=res.price, y=0).reverse()[0] : 0


        return (
            <div id="overlay" onClick={this.closeOverlay}>
                <div id="shopping-cart" onClick={e=>e.stopPropagation()}>
                    <div id="cart-header">
                        My Bag, {this.quantityCounter()} items
                    </div>
                    <div className="modalBodyWrapper">
                    <ul>
                        {this.props.itemsInCart.map((item, index) => (
                            <li key={index}>

                                <div className="groupContent">
                            <div className="groupContentImgSC1">
                                <div className="shoppingCartItemList"><span className="shoppingCartItemListTextName">{item.name}</span>
                                <span className="shoppingCartItemListTextPrice">
                                    {item.currency + item.price.toFixed(2)}</span>{" "}


                                   <div className="galleryAttributesSC"><div className="caption">{item.attributesFull.map(
                                        res=>res.type==='text' && res.id !=='With USB 3 ports' && res.id !=='Touch ID in keyboard' ?
                                            res.id+":": "")}</div>
                                    {item.attributesFull.map((item1)=>item1.type==='text' &&
                                    item1.id !=='With USB 3 ports' && item1.id !=='Touch ID in keyboard' ?
                                          item1.items.map(item2=>{
                                              return this.props.itemsInCart.attributesId!==null ?

                                                  (<div className="attributesItemSC" key={item2.id}
                                                        style={item.attributesId===item2.id ?
                                                      {backgroundColor: 'black', color: 'white'}: {}}>
                                                      <span className="attributesItemSCtext">{item2.value}</span>
                                                  </div>) :
                                                  (<div className="attributesItemSC" key={item2.id}  >
                                                      <span className="attributesItemSCtext">{item2.value}</span>
                                                  </div>)}) : null) }
                                    <br/>
                                </div>

                                <div className="galleryAttributesSwatchSC"
                                     style={item.attributesSwatch===null ?
                                    {display:'none'} : {}}>
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
                                        <div className="galleryAttributesAdd1SCCaption" style={item.attributesAdd1===null ?
                                            {display:'none'} : {}}>{item.attributesFull.map((item1, index)=>
                                        {if (index === 1) {return item1.id}})}
                                        </div>
                                        {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                            return this.props.itemsInCart.map(res=>res.attributesAdd1) !==null ?
                                                (<div className="attributesItemAdd1SC" key={item2.id}
                                                      style={item.attributesAdd1===item2.id ?
                                                          {backgroundColor: 'black',
                                                              color: 'white'}: {}}>
                                                    <span className="attributesItemSCtext">{item2.id}
                                                    </span>
                                                </div>) : (<div className="attributesItemAdd1SC" key={item2.id}>
                                                    <span className="attributesItemSCtext">{item2.id}</span></div>)}) : null) }
                                        <br/>
                                    </div>

                                    <div className="galleryAttributesAdd2SC">
                                        <div className="galleryAttributesAdd2SCCaption" style={item.attributesAdd2===null ?
                                            {display:'none'} : {}}>{item.attributesFull.map((item1, index)=>
                                        {if (index === 2) {return item1.id}})}</div>
                                        {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))
                                            ? item1.items.map(item2=>{
                                            return this.props.itemsInCart.map(res=>res.attributesAdd2) !==null ?
                                                (<div className="attributesItemAdd2SC" key={item2.id}
                                                      style={item.attributesAdd2===item2.id ?
                                                          {backgroundColor: 'black',
                                                              color: 'white'}: {}}>
                                                    <span className="attributesItemSCtext">{item2.id}</span>
                                                </div>) : (<div className="attributesItemAdd2SC" key={item2.id}>
                                                    <span className="attributesItemSCtext">{item2.id}</span></div>)}) : null) }
                                        <br/>
                                    </div>
</div></div>
<div className="groupContentImgSC2">
    <div className="plus_minusContentImgSC">
<div className="plusContentImgSC" onClick={() => {this.handlerIncreaseQuantity({
        indexId:this.props.itemsInCart[index].indexId,
        id: this.props.itemsInCart[index].id,
        name: this.props.itemsInCart[index].name,
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
        })}}>{"+"}</div>
        <div className="countContentImgSC">
            <span className="countContentImgSCNumber">{this.props.itemsInCart[index].quantity}</span></div>
<div className="minusContentImgSC"
     onClick={() => {this.handlerDecreaseQuantity(
    {
        indexId:this.props.itemsInCart[index].indexId,
        id: this.props.itemsInCart[index].id,
        name: this.props.itemsInCart[index].name,
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
                    </div>
                    <div id="empty-cart">{(this.props.itemsInCart.length === 0) ? "Shopping cart is empty" : ""}</div>
                    <div id="totals">
                        <div className="totals1">
                        <div className="totalsText">{"Total: "}</div>
                            <div>{this.props.itemsInCart.map((res, index )=>
                            {if(index===0) return res.currency})}{amountToPay.toFixed(2)}</div>
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