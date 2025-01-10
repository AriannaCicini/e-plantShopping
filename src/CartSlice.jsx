import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
        console.log("Adding to cart:", product);
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;  // Increment quantity if item exists
      } else {
        state.items.push({ name, image, cost, quantity: 1 });  // Add new item if it doesn't exist
      }
    },
    
    // Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    
    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;  // Update quantity if item exists
      }
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be used in the store
export default CartSlice.reducer;
