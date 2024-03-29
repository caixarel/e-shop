import { useState } from "react";
import { signInWithGooglePopUp,
SignInAuthWithEmailAndPassword }
   from "../../utils/firebase/utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields= {
  email: '',
  password: '',
};

export const SignInForm = ()=>{
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;


  const resetFormFields = () =>{
    setFormFields(defaultFormFields)
  }

   const signInWithGoogle = async()=>{
    await signInWithGooglePopUp();
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try{
      await SignInAuthWithEmailAndPassword(email, password);
      resetFormFields()
    }catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert("Wrong password for email")
          break;
        case 'auth/user-not-found':
          alert("No user associated with this email")
          break
        default:
          console.log(error)
      }
    }

  }


  const handleChange = (event)=>{
    const { name,value } = event.target;
    setFormFields({
      ...formFields,[name]:value
    })
  }


  return(
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your password and email </span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput label="email" required onChange={handleChange} name='email' value={email}/>
        <FormInput label="Password" required onChange={handleChange} name='password' value={password} />
        <div className="buttons-container">
        <Button type="submit">Sign in</Button>
        <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}
