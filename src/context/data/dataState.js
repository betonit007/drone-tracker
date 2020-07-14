import React, { useReducer, createContext } from "react";
import dataReducer from "./dataReducer";

import { ADD_DRONE, SET_MARKER } from '../types'



export const DataContext = createContext();

const DataState = (props) => {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    downedDrones: [],
    selected: null
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

  const setSelected = marker => {
    dispatch({
      type: SET_MARKER,
      payload: marker
    })
  }

  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        downedDrones: state.downedDrones,
        selected: state.selected,
        addDrone,
        setSelected
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState
