import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/auth/authState";
import { auth } from "../../firebase/firebase.utils";

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm(); //Intialize react-hook-form

  const { registerNonGoogle } = authContext;

  return (
    <div className="form-body">
      <form onSubmit={handleSubmit(registerNonGoogle)}>
        <input name="name" placeholder="Name" ref={register} />{" "}
        <input
          type="text"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && "Please enter a valid email address."}
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && "Password must be at least six characters long."}
        <input className="bg-green-500" type="submit" />
      </form>
      <button
        className="testy rounded border"
        onClick={() => auth.signOut()}
      >
        Signout
      </button>
    </div>
  );
};

export default Register;
