import React, { useReducer, createContext } from "react";
import dataReducer from "./dataReducer";

import { ADD_DRONE } from '../types'



export const DataContext = createContext();

const DataState = (props) => {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    downedDrones: ['phantom'],
  });

  const addDrone = async (droneInfo) => {  

    try {
      //let res = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()
     
      dispatch({
        type: ADD_DRONE,
        payload: droneInfo
      })
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        downedDrones: state.downedDrones,
        addDrone
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState
