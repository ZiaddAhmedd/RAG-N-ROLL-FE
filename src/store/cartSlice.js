import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        products: [],
        cartQuantity: 0,
        cartTotalPrice: 0,
        totalDiscount: 0,
        shopId: "651afe8a9209145d61f015fc"
    },
    reducers : {
        addItem (state, action){
            const newItem = action.payload 
            const existingItem = state.items.find((item)=> item._id === newItem.product._id && item.size === newItem.size && item.color === newItem.color)
            if(!existingItem){
                state.items.push({
                    _id : newItem.product._id,
                    name: newItem.product.name,
                    category: newItem.product.category,
                    price: newItem.product.price,
                    images : newItem.product.images,
                    quantity: newItem.quantity,
                    size: newItem.size,
                    color: newItem.color,
                    type: newItem.type
                })
                state.products.push({
                    productID: newItem.product._id,
                    variant: {
                        color: newItem.color,
                        size: newItem.size,
                        quantity: newItem.quantity
                    }
                })
                state.cartQuantity= state.cartQuantity + newItem.quantity;
                state.cartTotalPrice = state.cartTotalPrice + newItem.product.price*newItem.quantity;
            }
        },
        deleteItem(state,action){
            const id = action.payload.id;
            const size = action.payload.size;
            const color = action.payload.color; 
            state.items = state.items.filter((item)=> item._id+item.size+item.color !== id+size+color)
            state.products = state.products.filter((item)=> item.productID+item.variant.size+item.variant.color !== id+size+color)
            state.cartQuantity = state.cartQuantity - action.payload.quantity;
            state.cartTotalPrice = state.cartTotalPrice - action.payload.price*action.payload.quantity;
        },
        increaseQuantity(state,action){
            const id = action.payload._id;
            const existingItem = state.items.find((item)=> item._id === id)
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.price*existingItem.quantity;
        },
        decreaseQuantity(state,action){
            const id = action.payload.id;
            const existingItem = state.items.find((item)=> item._id === id)
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.price*existingItem.quantity;
        },
        clearCart(state){
            state.items = [];
            state.products = [];
            state.cartQuantity = 0;
            state.cartTotalPrice= 0;
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer;