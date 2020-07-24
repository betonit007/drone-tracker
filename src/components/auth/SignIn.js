import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.utils";
import { AuthContext } from "../../context/auth/authState";
import AlertError from '../../components/AlertError'

const Signin = () => {
  const { register, handleSubmit, errors } = useForm(); //Intialize react-hook-form
  const { setError, clearError, error } = useContext(AuthContext);
  console.log(error)
  const onSubmit = async (data) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        clearError();
      }, 4000);
    }
  };

  return (
    <div className="mobile-width">
      {error && <AlertError error={error}/>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4">
        <input
          className="my-2 p-2 rounded"
          type="text"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Please enter a valid email address.</span>}
        <input
          className="my-2 p-2 rounded"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && (
          <span>Password must be at least six characters long.</span>
        )}
        {/* {credError && <p className="cred-error">Invalid user credentials</p> } */}
        <input
          className="my-2 p-2 rounded bg-gray-600 text-white shadow cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Signin;
