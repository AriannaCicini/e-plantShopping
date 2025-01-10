import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';  // Import actions
import './CartItem.css';  // Import your CSS for styling

const CartItem = ({ onContinueShopping }) => {
  // Get the cart items from the Redux store
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Function to calculate the total amount of all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  // Function for handling "Continue Shopping" button click
  const handleContinueShopping = () => {
    onContinueShopping();  // Call the passed-in function to navigate back to the product list
  };

  // Function to increment the quantity of an item
  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  };

  // Function to decrement the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {  // Prevent quantity from going below 1
      const updatedQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
    }
  };

  // Function to remove an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem({ name }));
  };

  // Function to calculate the total cost for an individual item (cost * quantity)
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);  // Format as a decimal number
  };

  return (
    <div className="cart-container">
      {/* Display the total cart amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      <div>
        {/* Map over each item in the cart and display it */}
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            {/* Item image */}
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              {/* Item name */}
              <div className="cart-item-name">{item.name}</div>

              {/* Item cost */}
              <div className="cart-item-cost">${item.cost.toFixed(2)}</div>

              <div className="cart-item-quantity">
                {/* Decrement button */}
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>

                {/* Display item quantity */}
                <span className="cart-item-quantity-value">{item.quantity}</span>

                {/* Increment button */}
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>

              {/* Display total cost for the item */}
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>

              {/* Delete button */}
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      {/* Continue shopping and Checkout buttons */}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
