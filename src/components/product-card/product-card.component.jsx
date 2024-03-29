import './product-card.styles.scss'
import Button from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({product})=>{
  const { name, price, imageUrl} = product;
  const dispatch = useDispatch();
  const cartitems = useSelector(selectCartItems);

  const addProductToCart = ()=>{
    dispatch(addItemToCart(cartitems, product))
  }

  return(
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button type='inverted' onClick={addProductToCart}>Add to cart </Button>
    </div>
  )
}

export default ProductCard;
