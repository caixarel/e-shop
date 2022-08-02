import { Outlet, Link } from "react-router-dom";
import { Fragment,useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user-context";
import { SignOutUser } from "../../utils/firebase/utils";


import './navigation.style.scss'

export const Navigation = () =>{
  const { currentUser} = useContext(UserContext)

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
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}
