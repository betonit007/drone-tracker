import React, { useReducer, createContext } from "react";
import { firestore } from '../../firebase/firebase.utils'
import dataReducer from "./dataReducer";

import { ADD_DRONE, SET_MARKER, SET_DRONE } from '../types'



export const DataContext = createContext();

const DataState = (props) => {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    downedDrones: [],
    selected: null,
    newDrone: null
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

  //Add a lost drone
const addDrone = async ({lat, lng, currentUser, droneName}) => {
  console.log(currentUser)
  try {
    const droneRef = firestore.collection('drones')
    await droneRef.add({
      droneName, 
      reportedBy: currentUser,
      lat,
      lng,
      time: new Date()
    })

  } catch (err) {
    console.log(err.message)
  }
}

//Delete drone from firstore database
const deleteDrone = async(id) => {  
  try {
    firestore.collection('drones').doc(id).delete() //delete drone by id 
  } catch (err) {
    console.log(err.message)
  }
}

  const setSelected = marker => {
    dispatch({
      type: SET_MARKER,
      payload: marker
    })
  }

  const setNewDroneInfo = info => {
    console.log('called')
    dispatch({
      type: SET_DRONE,
      payload: info
    })
  }

  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        downedDrones: state.downedDrones,
        selected: state.selected,
        newDrone: state.newDrone,
        setSelected,
        listenForDownedDrones,
        setNewDroneInfo,
        addDrone,
        deleteDrone
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState
