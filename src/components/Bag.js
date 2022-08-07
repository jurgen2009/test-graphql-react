import React from 'react'

class Bag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: null,
            data: [],
            loading: true,
            category: null,
            itemsInCart: [],
            attributesFull: [],
            amountToPay: 0,
            imageIndex: 0,
        }
    }

    amountToPay = () => {
        let y
        return this.props.itemsInCart.map(res => y += res.price, y = 0).reverse()[0]
    }

    addCartToOrder = () => {
        let itemsInOrder = JSON.parse(localStorage.getItem('itemsInOrder') || "[]")
        let itemInOrder = [...this.props.itemsInCart]
        itemsInOrder.push(itemInOrder)
        localStorage.setItem('itemsInOrder', JSON.stringify(itemsInOrder))

    }

    arrowRight = (index) => {
        this.props.bagArrowRight(index)
    }

    arrowLeft = (index) => {
        this.props.bagArrowLeft(index)
    }

    handlerIncreaseQuantity = (index) => {
        this.props.increaseQuantity(index)
    }

    handlerDecreaseQuantity = (index) => {
        this.props.decreaseQuantity(index)
    }


    quantityCounter = () => {
        let x
        return this.props.itemsInCart.map(res => x += res.quantity, x = 0).reverse()[0]
    }

    updateAmountToPay() {
        this.forceUpdate();
    }


    render() {

        let amountToPay = 0;
        let y
        amountToPay = this.props.itemsInCart.map(res=>y+=res.priceForOne*res.quantity, y=0).reverse()[0]!== undefined ?
            this.props.itemsInCart.map(res=>y+=res.priceForOne*res.quantity, y=0).reverse()[0] : 0


        if (this.props.itemsInCart.length===0) {
            return (<div id="empty">{'SHOPPING CART IS EMPTY!'}</div>)


        } else {
            return (<div id="cart-bag">
                <div id="cartBag-header">
                    <span id="cartBag-title">{'CART'}</span><br/>
                    <div className="bagUnderline"></div>
                </div>

                <ul>
                    {this.props.itemsInCart.map((item, index) => (
                        <li key={index}>
                            <div className="groupContentBag">
                                <div className="groupContentImgBag1">
                                    <div className="shoppingCartItemList">
                                        <div className="shoppingCartItemListNameBagText">{item.brand}</div>
                                        <div className="shoppingCartItemListNameBagText">{item.name}</div>
                                        <span className="shoppingCartItemListPriceBagText">
        {item.currency + item.priceForOne}</span>
                                        <div className="galleryAttributesBag">
                                            <div className="captionBag1">{item.attributesFull.map(
                                                res=>res.type==='text' && res.id !=='With USB 3 ports' && res.id !=='Touch ID in keyboard' ?
                                                    res.id+":": "")}</div>
                                            {item.attributesFull.map((item1)=>item1.type==='text' &&
                                            item1.id !=='With USB 3 ports' && item1.id !=='Touch ID in keyboard' ?
                                                item1.items.map(item2=>{
                                                    return this.props.itemsInCart.attributesId!==null ?

                                                        (<div key={item2.id} className={
                                                            item.attributesId===item2.id ? "attributesItemBagBlack" : "attributesItemBag"}>
                                                            <div className="attributesItemBagText">{item2.value}</div>
                                                        </div>) :
                                                        (<div className="attributesItemBag" key={item2.id}  >
                                                            <div className="attributesItemBagText">{item2.value}</div>
                                                        </div>)}) : null) }
                                        </div>

                                        <div className={item.attributesFull.map((item1)=>item1.items.map(item2=>item2.id!=='Color' ?
                                            "galleryAttributesSwatchBagNone" : "galleryAttributesSwatchBag"))}>
                                            <div
                                                className="captionBag2">{item.attributesFull.map(res => res.type === 'swatch' ? res.id+":" : "")}{" "}</div>
                                            {item.attributesFull.map((item1, index) => (item1.type === 'swatch') ? item1.items.map(item2 => {

                                                    return this.props.itemsInCart.attributesSwatch !== null ?
                                                        (<div className="attributesItemSwatchSelectedBag" key={item2.id}
                                                              style={item.attributesSwatch === item2.id ?
                                                                  {
                                                                      backgroundColor: item2.id,
                                                                      outlineStyle: 'solid',
                                                                      outlineColor: 'lawngreen',
                                                                      outlineOffset: '2px',
                                                                      outlineWidth: '2px'
                                                                  } : {backgroundColor: item2.id}}/>) :
                                                        (<div className="attributesItemSwatch" key={item2.id}
                                                              style={{backgroundColor: item2.id}}>{""}</div>)
                                                }) : null
                                            )}
                                        </div>

                                        <div className="galleryAttributesAdd1Bag">
                                            <div className={item.attributesFull.length<3 ?
                                                "galleryAttributesAdd1BagCaptionNone" : "galleryAttributesAdd1BagCaption"}>

                                                {item.attributesFull.map((item1, index)=>
                                                {if (index === 1) {return item1.id+":"}
                                                else
                                                {return null


                                                }})}
                                            </div>
                                            {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                                return this.props.itemsInCart.map(res=>res.attributesAdd1) !==null ?
                                                    (<div key={item2.id} className={item.attributesAdd1===item2.id ?
                                                        "attributesItemAdd1BagBlack" : "attributesItemAdd1Bag"}>
                                                        <div className="attributesItemBagText">{item2.id}
                                                        </div>
                                                    </div>) : (<div className="attributesItemAdd1Bag" key={item2.id}>
                                                        <div className="attributesItemBagText">{item2.id}</div></div>)}) : null) }
                                        </div>

                                        <div className="galleryAttributesAdd2Bag">
                                            <div className="galleryAttributesAdd2BagCaption" style={item.attributesAdd2===null ?
                                                {display:'none'} : {}}>{item.attributesFull.map((item1, index)=>
                                            {if (index === 2) {return item1.id+":"}
                                            else
                                            {return null


                                            }})}</div>
                                            {item.attributesFull.map((item1, index)=>(item1.id.includes("USB"))
                                                ? item1.items.map(item2=>{
                                                    return this.props.itemsInCart.map(res=>res.attributesAdd2) !==null ?
                                                        (<div key={item2.id} className={item.attributesAdd2===item2.id ?
                                                            "attributesItemAdd2BagBlack" : "attributesItemAdd2Bag"}>
                                                            <div className="attributesItemBagText">{item2.id}</div>
                                                        </div>) : (<div className="attributesItemAdd2Bag" key={item2.id}>
                                                            <div className="attributesItemBagText">{item2.id}</div></div>)}) : null) }
                                        </div>
                                    </div>
                                </div>
                                <div className="groupContentImgBag2">
                                    <div className="plus_minusContentImgBag">
                                        <div className="plusContentImgBag" onClick={() => {
                                            this.handlerIncreaseQuantity({
                                                indexId: this.props.itemsInCart[index].indexId,
                                                id: this.props.itemsInCart[index].id,
                                                name: this.props.itemsInCart[index].name,
                                                brand: this.props.itemsInCart[index].brand,
                                                gallery: this.props.itemsInCart[index].gallery,
                                                prices: this.props.itemsInCart[index].prices,
                                                attributesFull: this.props.itemsInCart[index].attributesFull,
                                                currency: this.props.itemsInCart[index].currency,
                                                price: this.props.itemsInCart[index].price * this.props.itemsInCart[index].quantity,
                                                attributesId: this.props.itemsInCart[index].attributesId,
                                                attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                image: this.props.itemsInCart[index].image,
                                                priceForOne: this.props.itemsInCart[index].price,
                                            })
                                        }}>
        <span className="plusSvg"><svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
        <rect fill="white" height="22" id="svg_1" width="20" x="3" y="2"/>
        <path d="m13.5,5l0,15" id="svg_2" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m6,12.5l15,0" id="svg_3" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
        </svg></span>
                                        </div>
                                        <div
                                            className="countContentImgBag">{this.props.itemsInCart[index].quantity}</div>
                                        <div className="minusContentImgBag"
                                             onClick={() => {
                                            this.handlerDecreaseQuantity(
                                                { indexId: this.props.itemsInCart[index].indexId,
                                                    id: this.props.itemsInCart[index].id,
                                                    name: this.props.itemsInCart[index].name,
                                                    brand: this.props.itemsInCart[index].brand,
                                                    gallery: this.props.itemsInCart[index].gallery,
                                                    prices: this.props.itemsInCart[index].prices,
                                                    attributesFull: this.props.itemsInCart[index].attributesFull,
                                                    currency: this.props.itemsInCart[index].currency,
                                                    price: this.props.itemsInCart[index].price * this.props.itemsInCart[index].quantity,
                                                    attributesId: this.props.itemsInCart[index].attributesId,
                                                    attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                    attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                    attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                    image: this.props.itemsInCart[index].image,
                                                    priceForOne: this.props.itemsInCart[index].price,
                                                })
                                        }}>
        <span className="minusSvg">
            <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0.5H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
        </svg></span>
                                        </div>
                                    </div>
                                    <img className="contentImgBag"
                                         key={item.id}
                                         src={item.gallery[item.imageIndex]}
                                         alt={"logo"}/>
                                    <div onClick={() => {
                                        this.arrowLeft(
                                            { indexId: this.props.itemsInCart[index].indexId,
                                                id: this.props.itemsInCart[index].id,
                                                name: this.props.itemsInCart[index].name,
                                                brand: this.props.itemsInCart[index].brand,
                                                gallery: this.props.itemsInCart[index].gallery,
                                                prices: this.props.itemsInCart[index].prices,
                                                attributesFull: this.props.itemsInCart[index].attributesFull,
                                                currency: this.props.itemsInCart[index].currency,
                                                price: this.props.itemsInCart[index].price * this.props.itemsInCart[index].quantity,
                                                attributesId: this.props.itemsInCart[index].attributesId,
                                                attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                image: this.props.itemsInCart[index].image,
                                                priceForOne: this.props.itemsInCart[index].price,
                                            })
                                    }} className={item.gallery.length > 1 ? "bagArrowLeftImage" : "bagArrowImageNone"}>
                                        <svg className="bagArrow" width="8" height="14" viewBox="0 0 8 14"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
                                                  stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div onClick={() => {
                                        this.arrowRight(
                                            { indexId: this.props.itemsInCart[index].indexId,
                                                id: this.props.itemsInCart[index].id,
                                                name: this.props.itemsInCart[index].name,
                                                brand: this.props.itemsInCart[index].brand,
                                                gallery: this.props.itemsInCart[index].gallery,
                                                prices: this.props.itemsInCart[index].prices,
                                                attributesFull: this.props.itemsInCart[index].attributesFull,
                                                currency: this.props.itemsInCart[index].currency,
                                                price: this.props.itemsInCart[index].price * this.props.itemsInCart[index].quantity,
                                                attributesId: this.props.itemsInCart[index].attributesId,
                                                attributesSwatch: this.props.itemsInCart[index].attributesSwatch,
                                                attributesAdd1: this.props.itemsInCart[index].attributesAdd1,
                                                attributesAdd2: this.props.itemsInCart[index].attributesAdd2,
                                                image: this.props.itemsInCart[index].image,
                                                priceForOne: this.props.itemsInCart[index].price,
                                            })
                                    }}
                                         className={item.gallery.length > 1 ? "bagArrowRightImage" : "bagArrowRightImageNone"}>
                                        <svg className="bagArrow" width="8" height="14" viewBox="0 0 8 14"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white"
                                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>

                                </div>

                            </div>
                            <div className="bagUnderline"></div>
                        </li>

                    ))}
                </ul>

                <div id="empty-cart">{(this.props.itemsInCart.length === 0) ? "Shopping cart is empty" : ""}</div>


                <div id="bagTotals">
                    <div id="bagTax">{'Tax 21%: '}<div className="totalsBagFont">
        {this.props.itemsInCart[0].currency}
                        {(amountToPay * 21 / 100).toFixed(2)}</div>
                    </div>
                    <div id="bagQuantity">{'Quantity: '}
                    <div className="totalsBagFont">{this.quantityCounter()}</div>
                    </div>
                    <div id="bagTotalSum">
                        <span id="bagTotalName">{'Total: '}</span>
                        <span className="totalsBagFont">
        {this.props.itemsInCart[0].currency}
                            {amountToPay.toFixed(2)}</span>
                    </div>
                    <button id="bagOrderButton"
                            onClick={() => {
                                this.addCartToOrder();
                                localStorage.removeItem('itemsInCart')
                                alert('your order received!')
                            }}>{'ORDER'}</button>

                </div>

            </div>)
        }
    }
}
export default Bag
