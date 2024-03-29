import { useState } from "react";
import { createAuthWithEmailAndPassword,
  createDocumentUSerFromAuth }
   from "../../utils/firebase/utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields= {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const SignUpForm = ()=>{
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword} = formFields;

  const resetFormFields = () =>{
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(password !== confirmPassword){
      alert('passwords do not match')
      return
    }
    try{
      const {user} = await createAuthWithEmailAndPassword(email,password);
      await createDocumentUSerFromAuth(user,{displayName});
      resetFormFields();
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert("email already in use")
      }else{

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
      <h2>Don't have an account?</h2>
      <span>Sign up with password and email </span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput label="Display Name" required onChange={handleChange} name='displayName' value={displayName}/>
        <FormInput label="email" required onChange={handleChange} name='email' value={email}/>
        <FormInput label="Password" required onChange={handleChange} name='password' value={password} />
        <FormInput label="Confirm Pasword" required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}
