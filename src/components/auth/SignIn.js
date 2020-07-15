import React from 'react';
import { useForm } from "react-hook-form";
import { auth } from '../../firebase/firebase.utils'

const Signin = () => {
    
  const { register, handleSubmit, errors } = useForm(); //Intialize react-hook-form

  const onSubmit = async (data) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password)

    } catch (err) {
      console.log(err.message)
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <input 
          className='m-2 p-2 rounded'
          type="text" 
          placeholder="Email" 
          name="email" 
          ref={register({required: true, pattern: /^\S+@\S+$/i})} 
          />   
        {errors.email && <span>Please enter a valid email address.</span>}
        <input type="password" placeholder="Password" name="password" ref={register({required: true, minLength: 6})} />        
        {errors.password && <span>Password must be at least six characters long.</span>}
        {/* {credError && <p className="cred-error">Invalid user credentials</p> } */}
        <input className='fire-btn' type="submit" />
      </form>
    </div>
  )
}

export default Signin
