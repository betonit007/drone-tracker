import React, { useReducer, createContext } from "react";
import dataReducer from "./dataReducer";

import { GET_DATA } from '../types'



export const DataContext = createContext();

const DataState = (props) => {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    fetchedData: null,
    more: true,
    data: [],
    after: 0,
  });

  const fetchSomeData = async () => {  

    try {
      let res = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()
      console.log(res)
      dispatch({
        type: GET_DATA,
        payload: res
      })
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <DataContext.Provider
      value={{
        loading: state.loading,
        more: state.more,
        data: state.data,
        after: state.after,
        fetchSomeData
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState
