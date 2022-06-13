export const  GET_ALL_CATEGORIES = `
query {
  categories{
    name
  }
}
`
export const  GET_ALL_PRODUCTS = `

query { 
categories{
  products{
    id, name, gallery, prices {
      amount, currency{
        label, symbol
      } 
    }
  }
}
} 
`
export const  GET_PRODUCT = `
query GetProductId ($id: String!){
    product(id:$id){id, name, gallery, brand, description, attributes {id, name, type, items {id, value, displayValue}} 
    prices {amount, currency {label, symbol}}}}
`
export const  GET_CURRENCY =`
query {
  currencies{
    label, symbol
  }
}
`






