import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
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
    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;  // Update the quantity
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default CartSlice.reducer;
