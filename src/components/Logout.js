import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/authState'
import { auth } from '../firebase/firebase.utils'

const Logout = () => {

    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    return (
        <div className='absolute right-0 top-0'>
            <i onClick={()=>auth.signOut()} className='text-white fa fa-sign-out fa-2x mt-3 mr-5 cursor-pointer transform hover:scale-110'></i>
        </div>
    )
}

export default Logout
