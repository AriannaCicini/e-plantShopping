import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
        const product = action.payload;  // Prendi il prodotto passato in payload
        console.log("Adding to cart:", product);
    debugger
        const { name, image, cost } = product;  // Estrai le informazioni necessarie dal prodotto
    
        // Verifica se il prodotto esiste già nel carrello
        const existingItem = state.items.find(item => item.name === name);
    
        if (existingItem) {
          // Se il prodotto esiste già, incrementa la quantità
          existingItem.quantity++;
        } else {
          // Se il prodotto non esiste, aggiungi un nuovo prodotto con quantità 1
          state.items.push({ name, image, cost, quantity: 1 });
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
