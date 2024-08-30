import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id : newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })   
            } else {
                existingItem.quantity += 1;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItem(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            console.log(existingItem.quantity)
            console.log(existingItem)
            state.totalQuantity--;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            } else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }

    }
})


export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Loading...',
            message: 'Please wait'
          }));

          const senRequest = async () =>{
            const response = await fetch('https://cart-a662c-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
              });
    
              if(!response){
                throw new Error("Sending out data file failed.")
              }
          }
          try{
            await senRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!...',
                message: 'Sent Successfully!'
              }))
            }catch(error){
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!...',
                    message: 'Sending cart data failed!'
                  }))
            }
        };
}

export const cartActions = cartSlice.actions;
export default cartSlice;