import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/auth/authState";
import AlertError from "../../components/AlertError";

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm(); //Intialize react-hook-form

  const { registerNonGoogle, error } = authContext;

  return (
    <div className="relative landing-page-container flex justify-center items-center">
      {error && <AlertError error={error} />}
      <form
        className="flex flex-col m-4 mobile-width"
        onSubmit={handleSubmit(registerNonGoogle)}
      >
        <h1 className="text-white text-4xl text-center">Register</h1>
        <input
          className="my-2 p-2 rounded"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ requireed: true })}
        />
        <input
          className="my-2 p-2 rounded"
          type="text"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && "Please enter a valid email address."}
        <input
          className="my-2 p-2 rounded"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && "Password must be at least six characters long."}
        <input
          className="my-2 p-2 rounded"
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.confirm && "Password must be at least six characters long."}
        <input
          className="my-2 p-2 rounded bg-gray-600 text-white shadow cursor-pointer"
          type="submit"
        />
        <Link className="text-white text-center p-4" to="/">
          Click here to Signin
        </Link>
      </form>
    </div>
  );
};

export default Register;
