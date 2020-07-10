import React, { useState, useContext } from "react";
import { AuthContext } from '../../context/auth/authState'


const Register = () => {

  const authContext = useContext(AuthContext)

  const { register } = authContext

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onSubmit = (e) => {
    e.preventDefault()
    
      if (name && email && password && password) {
      register({
        name, email, password
      })
      setUser({name: '', email: '', password:'', password2: ''})
    }
  }

  const onChange = e => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password confirm">Confirm password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} />
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default Register;
