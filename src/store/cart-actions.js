import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
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
                  })
                )
            }
        };
}


export const fetchCartData = () =>{
    return async (dispatch) => {
        const fetchData = async() => {
           const response =  await fetch('https://cart-a662c-default-rtdb.firebaseio.com/cart.json');
           if(!response){
            throw new Error("Could not fetch data");
           }
           const data = await response.json();
           return data;
        };
        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!...',
                message: 'Fetching cart data failed!'
              })
            );
        }
    }
}