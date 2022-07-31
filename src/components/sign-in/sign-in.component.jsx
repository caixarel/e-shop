import { signInWithGooglePopUp, createDocumentUSerFromAuth } from "../../utils/firebase/utils"
import { SignUpForm } from "../sign-up-form/sign_up-form.component";

export const SignIn =()=>{


  const logGoogleUser = async()=>{
    const {user} = await signInWithGooglePopUp();
    createDocumentUSerFromAuth(user)
  }

  return (
  <div>
    <h1>Sign in</h1>
    <button onClick={logGoogleUser}>Sign in with google</button>
    <SignUpForm />
  </div>
  )
}
