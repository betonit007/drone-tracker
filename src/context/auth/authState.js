import React, { useReducer, createContext } from "react";
import { createUserProfileDocument, auth } from "../../firebase/firebase.utils";
import authReducer from "./authReducer";

import { SET_CURRENT_USER } from "../types";

export const AuthContext = createContext();

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    authState: null,
    loading: true,
  });

  //Intialize User Auth / Sign In
  const initializeAuth = () => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snap) => {
          dispatch({
            type: SET_CURRENT_USER,
            payload: {
              currentUser: {
                id: snap.id,
                ...snap.data(),
              },
            },
          });
        });
      }
      dispatch({
        //this essentials sets current user to null if user signs out
        type: SET_CURRENT_USER,
        payload: user,
      });
      return () => unsubscribeFromAuth(); //The returned function will be called just before every rerendering of the component
    });
  };

  const registerNonGoogle = async (data) => {
    console.log(data)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      await createUserProfileDocument(user, { displayName: data.name });
    } catch (err) {
     console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state.authState,
        loading: state.loading,
        initializeAuth,
        registerNonGoogle
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
