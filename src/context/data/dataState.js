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

  // const addDrone = async (droneInfo) => {  

  //   try {
     
  //     dispatch({
  //       type: ADD_DRONE,
  //       payload: droneInfo
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const listenForDownedDrones = () => {
    const lostDronesRef = firestore.collection('drones');
    lostDronesRef.onSnapshot((drone) => {
      let allDroneData = drone.docs.map((d) => d.data())
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
