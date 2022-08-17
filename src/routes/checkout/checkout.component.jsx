import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { selectCartItems,selectCartTotal } from '../../store/cart/cart.selector'
import { useSelector } from 'react-redux'

export default function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
         <div className='header-block'>
          <span>description</span>
        </div>
         <div className='header-block'>
          <span>Quantity</span>
        </div>
         <div className='header-block'>
          <span>Price</span>
        </div>
         <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      { cartItems.map((cartItem)=>{
        return (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)

      })}
      <span className='total'>Total: {cartTotal}€</span>
    </div>
  )
}
