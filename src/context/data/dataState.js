import React, { useReducer, createContext } from "react";
import { firestore } from '../../firebase/firebase.utils'
import dataReducer from "./dataReducer";

import { ADD_DRONE, SET_MARKER } from '../types'



export const DataContext = createContext();

const DataState = (props) => {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    downedDrones: [],
    selected: null
  });

  const listenForDownedDrones = () => {
    const lostDronesRef = firestore.collection('drones');
    lostDronesRef.onSnapshot((drone) => {
      
      let allDroneData = drone.docs.map(d => 
        { return {
          ...d.data(), id: d.id //return id for each drone and spread in drone data 
        }
      })
      dispatch({
        type: ADD_DRONE,
        payload: allDroneData
      })
    })
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
        setSelected,
        listenForDownedDrones
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState
