import React, { useEffect} from "react";
import { Routes,Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./routes/home/home.component";
import { Navigation } from "./routes/navigation/navigation.component";
import { SignIn } from "./components/sign-in/sign-in.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener, createDocumentUSerFromAuth} from "./utils/firebase/utils"
import { setCurrentUser } from "./store/user/user.action"


const App =()=> {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user){createDocumentUSerFromAuth(user)}
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  },[dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>

    </Routes>
  );
}

export default App;
