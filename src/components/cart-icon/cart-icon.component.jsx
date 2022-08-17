import React from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'

export default function CartIcon() {
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch()

  const toggleIsCartOpen = ()=>{
    dispatch(setIsCartOpen(!isCartOpen))
  }

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='cart-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}
