import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { SignOutUser } from "../../utils/firebase/utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import './navigation.style.scss'

export const Navigation = () =>{
  const currentUser =  useSelector((state)=>state.user.currentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutHandler = async() =>{
     await SignOutUser();
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">Shop</Link>
          {
            currentUser ? (<span className="nav-link" onClick={signOutHandler}>Sign out</span>)
            :(
              <Link className="nav-link" to="/sign-in">Sign In</Link>
            )
          }
          <CartIcon />
        </div>
       { isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}
