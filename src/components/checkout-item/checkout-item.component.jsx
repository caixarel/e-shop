import React, { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart-context'

export default function CheckoutItem({cartItem}) {
  const { name, imageUrl, price, quantity} = cartItem
  const { clearItemFromCart, addItemToCart,RemoveItemFromCart } = useContext(CartContext)

  const itemClearHandler = ()=>clearItemFromCart(cartItem);
  const addItemHandler =()=>addItemToCart(cartItem);
  const removeItemHandler = ()=>RemoveItemFromCart(cartItem);


  return (
    <div className='checkout-item-container'>
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>&#10095; </div>
        </span>
      <span className='price'>{price}</span>
      <div className="remove-button" onClick={itemClearHandler}>
        &#10005;
      </div>
    </div>
  )
}
