import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        totalQuantity: parseInt(localStorage.getItem('totalQuantity')) || 0,
        totalPrice:parseFloat(localStorage.getItem('totalPrice')) || 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
        
            if (existingItem) {
                existingItem.count += 1;
                state.totalQuantity += 1; 
            } else {
                state.items.push({ ...newItem, count: 1 });
                state.totalQuantity += 1;
            }
        
            state.totalPrice += newItem.price;
            localStorage.setItem('totalQuantity', state.totalQuantity.toString());
            localStorage.setItem('totalPrice', state.totalPrice.toString());
        },
        removeItem: (state, action) => {
            const itemIdToRemove = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === itemIdToRemove);
        
            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                
                state.totalQuantity -= existingItem.count;
                state.totalPrice -= existingItem.count * existingItem.price;
                
                state.items.splice(existingItemIndex, 1);
                
                localStorage.setItem('totalQuantity', state.totalQuantity.toString());
                localStorage.setItem('totalPrice', state.totalPrice.toString());
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        incrementItem: (state, action) => {
            const itemIdToIncrement = action.payload;
            const existingItem = state.items.find(item => item.id === itemIdToIncrement);

            if (existingItem) {
                existingItem.count += 1;
                state.totalQuantity += 1;
                state.totalPrice += existingItem.price;
                localStorage.setItem('totalQuantity', state.totalQuantity.toString());
                localStorage.setItem('totalPrice', state.totalPrice.toString());
            }
        },
        decrementItem: (state, action) => {
            const itemIdToDecrement = action.payload;
            const existingItem = state.items.find(item => item.id === itemIdToDecrement);
        
            if (existingItem) {
                if (existingItem.count === 1) {
                    state.totalQuantity -= 1;
                    state.totalPrice -= existingItem.price; 
                    state.items = state.items.filter(item => item.id !== itemIdToDecrement);
                } else {
                    existingItem.count -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= existingItem.price;
                }
                
                if (existingItem.count === 0) {
                    existingItem.price = 0; 
                }
                
                localStorage.setItem('totalQuantity', state.totalQuantity.toString());
                localStorage.setItem('totalPrice', state.totalPrice.toString());
            }
        },
        
        
      
        
    },
});

export const initializeCartFromLocalStorage = () => {
    return (dispatch) => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: 'cart/setCartItems', payload: storedCartItems });
    };
};

export const { addItem, removeItem,incrementItem,decrementItem} = cartSlice.actions;
export default cartSlice.reducer;
