
export const CREATE_ORDER =`
    mutation createOrder($input: OrderInput) {
        createOrder(input: $input) { totalPrice, currency, tax, totalQuantity {
            id, quantity, name, price, attributes {
            attributesId, attributesSwatch, attributesAdd1, attributesAdd2
            }
            }  
        }
    }
`