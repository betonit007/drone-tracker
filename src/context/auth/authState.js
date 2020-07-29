import React, { useReducer, createContext } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import authReducer from "./authReducer";

import { SET_CURRENT_USER, SET_ERROR, CLEAR_ERROR } from "../types";

export const AuthContext = createContext();

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    authState: null,
    loading: true,
    error: null,
  });

  //VERIFY USER / CREATE USER IF DOESN'T EXIT
  const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email, photoURL } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          photoURL,
          ...additionalData,
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    return userRef;
  };

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
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      await createUserProfileDocument(user, { displayName: data.name });
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        clearError()
      }, 4000)
    }
  };

  const setError = (message) => {
    if (!message) {
      return;
    }
    dispatch({
      type: SET_ERROR,
      payload: message,
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state.authState,
        loading: state.loading,
        error: state.error,
        createUserProfileDocument,
        initializeAuth,
        registerNonGoogle,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
