import React from 'react';
import {GET_PRODUCT} from '../query/СategoryQuery.js'

class ProductPage extends React.Component{
    constructor(props) {
        super(props);
        this.handlerGallery = this.handlerGallery.bind(this)
        this.state = {
            data: [],
            loading: true,
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

        fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query:GET_PRODUCT, variables: {id: this.props.productID }})
        }).then(res => res.json()).then((response) => {
            this.setState({ data: response.data, loading: false })
        })}

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.data !== this.props.data) {
            fetch('http://localhost:4000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: GET_PRODUCT, variables: {id: this.props.productID}})
            }).then(res => res.json()).then((response) => {
                this.setState({ data: response.data, loading: false })
            })
        }
    }


    handlerGallery = (index)=> {this.props.updateGallery(this.state.galleryIndex=index)}

    handlerAttributesItem = (id)=> {if (this.props.attributesItemId!==id)
    {this.props.updateAttributesItemId(this.state.attributesItemId=id)}}

    handlerAttributesItemSwatch = (id)=> {if (this.props.attributesItemIdSwatch!==id)
    {this.props.updateAttributesItemIdSwatch(this.state.attributesItemIdSwatch=id)}}

    handlerAttributesItemAdd1 = (id)=> {if (this.props.attributesItemIdAdd1!==id)
    {this.props.updateAttributesItemIdAdd1(this.state.attributesItemIdAdd1=id)}}

    handlerAttributesItemAdd2 = (id)=> {if (this.props.attributesItemIdAdd2!==id)
    {this.props.updateAttributesItemIdAdd2(this.state.attributesItemIdAdd2=id)}}

    addProductArr = () => {
        this.props.addToCart(
            (this.props.productID===this.state.data.product.id) ? {
                indexId: this.props.itemsInCart.length,
                id: this.state.data.product.id,
                name: this.state.data.product.name,
                gallery: this.state.data.product.gallery,
                prices: this.state.data.product.prices,
                attributesFull: this.state.data.product.attributes,
                currency:this.state.data.product.prices[parseInt(this.props.currentCurrency)].currency.symbol,
                price:this.state.data.product.prices[parseInt(this.props.currentCurrency)].amount,
                attributesId: this.state.attributesItemId,
                attributesSwatch: this.state.attributesItemIdSwatch,
                attributesAdd1: this.state.attributesItemIdAdd1,
                attributesAdd2: this.state.attributesItemIdAdd2,
                image: this.state.data.product.gallery[this.state.galleryIndex],
                quantity: 1,
                imageIndex: 0,
            } : null)

    }

    checkAttributesItemId=()=>{
       if (this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemId))).some(res2=>res2===true)
       )
       { return this.addProductArr()} else {alert('attributes should be selected!' )}
    }

    checkAttributesItemIdSwatch=()=>{
        if (this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemIdSwatch))).some(res2=>res2===true)
           && this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemId))).some(res2=>res2===true)
        )
        { return this.addProductArr()} else {alert('attributes should be selected!' )}
    }

    checkAttributesItemIdAdd=()=>{
          if (this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemIdAdd1))).some(res2=>res2===true)
              &&
              this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemIdAdd2))).some(res2=>res2===true)
              &&
              this.state.data.product.attributes.map(res => res.items.some(res1 => res1.id.includes(this.state.attributesItemId))).some(res2=>res2===true)
          )
        { return this.addProductArr()} else {alert('attributes should be selected!' )}

    }


    render() {

        const {loading, data} = this.state

        if (loading) return "Loading...";


        if (this.props.productID!==null) {
            return (
                <div>
                    <div className="product">

                        <ul id="galleryList" className="galleryList">{data.product.gallery.map((item, index)=>
                            ( <li key={index} onClick={() => {this.handlerGallery(index)}}>
                                <img className="galleryListImg" key={index} src={item} alt={"logo"} style={index === 0 ?
                                    {display:'none'} : {}}  />
                            </li>))}</ul>
                        <div className="galleryItem">
                            <div className="galleryItemImg">
                                <img src={data.product.gallery[this.state.galleryIndex]} alt={"logo"} />
                            </div>
                            <div className="galleryAddInfo">
                                <span className="attributesItemName">{data.product.name}</span>
                                <br/>
                                <span className="attributesItemType">{data.product.attributes.map((item1)=>{
                                    if (item1.type !== 'swatch' && item1.id !== 'With USB 3 ports' && item1.id !== 'Touch ID in keyboard')
                                    {return item1.id+":"}})}</span>
                                <div className="galleryAttributes">
                                    {data.product.attributes.map((item1)=>item1.type==='text' && item1.id !=='With USB 3 ports' && item1.id !=='Touch ID in keyboard' ?
                                        item1.items.map(item2=>{
                                        return this.state.attributesItemId!==null ? (<div className="attributesItem" key={item2.id}
                                                                                          style={this.state.attributesItemId===item2.id ?
                                                                                              {backgroundColor: 'black',
                                                                                                  color: 'white'}: {}}
                                                                                          onClick={() =>
                                                                                          {this.handlerAttributesItem(item2.id)}}>
                                                <span className="attributesItemText">{item2.value}</span>
                                        </div>) :
                                            (<div className="attributesItem" key={item2.id}  onClick={() =>
                                            {this.handlerAttributesItem(item2.id)}}>
                                                <span className="attributesItemText">{item2.value}</span>
                                            </div>)
                                        }) : null) }
                                    <br/>
                                </div>
                                <span className="attributesItemSwatchType">
                                {data.product.attributes.map((item1, index)=> {if (item1.type === 'swatch'|| item1.id==='With USB 3 ports')
                                {return item1.id+":"}})}</span>
                                <div className="galleryAttributesSwatch">

                                    {data.product.attributes.map((item1)=>(item1.type==='swatch') ? item1.items.map(item2=>{

                                            return this.state.attributesItemIdSwatch!==null ? (<div className="attributesItemSwatchSelected" key={item2.id}
                                                                                                    style={this.state.attributesItemIdSwatch === item2.id ?
                                                                                                        {
                                                                                                            backgroundColor: item2.id,
                                                                                                            outlineStyle: 'solid',
                                                                                                            outlineColor: 'lawngreen',
                                                                                                            outlineOffset: '2px',
                                                                                                            outlineWidth: '2px'
                                                                                                        } : {backgroundColor: item2.id}} onClick={() => {
                                                this.handlerAttributesItemSwatch(item2.id)
                                            }}/>) : (<div className="attributesItemSwatch" key={item2.id}  style={{backgroundColor: item2.id}} onClick={() =>
                                            {this.handlerAttributesItemSwatch(item2.id)}}>{""}</div>)
                                        }) : null
                                    )}
                                    <br/>
                                </div>
                                <div className="galleryAttributesAdd1">
                                    {data.product.attributes.map((item1)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                            return this.state.attributesItemIdAdd1 !==null ?
                                                (<div className="attributesItemAdd1" key={item2.id}
                                                                                              style={this.state.attributesItemIdAdd1===item2.id ?
                                                                                                  {backgroundColor: 'black',
                                                                                                      color: 'white'}: {}}
                                                      onClick={() => {this.handlerAttributesItemAdd1(item2.id)}}>
                                                    <span className="attributesItemText">{item2.id}</span>
                                                </div>) : (<div className="attributesItemAdd1" key={item2.id}  onClick={() =>
                                                {this.handlerAttributesItemAdd1(item2.id)}}><span className="attributesItemText">{item2.id}</span></div>)}) : null) }
                                    <br/>
                                </div>

                                <div className="galleryAttributesAdd2">
                                    <div className="galleryAttributesAdd2Caption"><span className="attributesItemType">
                                        {data.product.attributes.map((item1, index)=>{if (index === 2) {return item1.id+":"}})}</span></div>
                                    {data.product.attributes.map((item1)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                        return this.state.attributesItemIdAdd2 !==null ?
                                            (<div className="attributesItemAdd2" key={item2.id}
                                                  style={this.state.attributesItemIdAdd2===item2.id ?
                                                      {backgroundColor: 'black',
                                                          color: 'white'}: {}}
                                                  onClick={() => {this.handlerAttributesItemAdd2(item2.id)}}>
                                                <span className="attributesItemText">{item2.id}</span>
                                            </div>) : (<div className="attributesItemAdd2" key={item2.id}  onClick={() =>
                                            {this.handlerAttributesItemAdd2(item2.id)}}><span className="attributesItemText">{item2.id}</span></div>)}) : null) }
                                    <br/>
                                </div>

                                    <div className="galleryAddInfoPrice">
                                        {"PRICE: "}<br/><br/>{data.product.prices[parseInt(this.props.currentCurrency)].currency.symbol}{" "}{data.product.prices[parseInt(this.props.currentCurrency)].amount}
                                    </div>
                                 <div className="galleryRight">


                                    {<button id="galleryAddInfoButton" onClick={() =>{
                                        if ( data.product.attributes.length === 0) {return this.addProductArr()} else if
                                        (data.product.attributes.length === 1) { return this.checkAttributesItemId()} else if
                                        (data.product.attributes.length === 2)  {return this.checkAttributesItemIdSwatch()} else if
                                        (data.product.attributes.length === 3)  {return this.checkAttributesItemIdAdd()}
                                    }}>ADD TO CART
                                    </button>}
                                    <div className="galleryAddInfoDescription" dangerouslySetInnerHTML={{ __html: data.product.description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} else { return "Loading..."}
    }
}


export default ProductPage



