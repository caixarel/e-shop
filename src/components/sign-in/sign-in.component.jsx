import { SignUpForm } from "../sign-up-form/sign_up-form.component";
import { SignInForm } from "../sign-in-form/sign_in-form.component";
import './authentication.styles.scss'
export const SignIn =()=>{

  return (
  <div className="authentication-container">
    <SignInForm />
    <SignUpForm />
  </div>
  )
}
