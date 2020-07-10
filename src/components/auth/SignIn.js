import React, {useState, useContext} from 'react'
import { signInWithGoogle } from '../../firebase/firebase.utils'
import { AuthContext } from '../../context/auth/authState'

const SignIn = () => {

  const authContext = useContext(AuthContext)

  const { login } = authContext

    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const {email, password } = user;
    
      const onSubmit = (e) => {
        e.preventDefault()
        console.log(user)
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
            <h2>Signin</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div>
              <input type="submit"/>
            </div>
          </form>
          <button className="bg-red-500 rounded" onClick={signInWithGoogle}>Google SignIN</button>
        </div>
      );
    };
    
export default SignIn
