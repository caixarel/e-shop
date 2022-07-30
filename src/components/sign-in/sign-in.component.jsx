import { signInWithGooglePopUp } from "../../utils/firebase/utils"
import {createDocumentUSerFromAuth} from "../../utils/firebase/utils"
export const SignIn =()=>{
  const logGoogleUser = async()=>{
    const {user} = await signInWithGooglePopUp();
    console.log(user);
    createDocumentUSerFromAuth(user)
  }
  return (
  <div>
    <h1>Sign in</h1>
    <button onClick={logGoogleUser}>Sign in with google</button>
  </div>
  )
}
