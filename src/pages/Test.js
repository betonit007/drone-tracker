import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/data/dataState'

const Test = () => {

    const { fetchSomeData, loading } = useContext(DataContext)

    console.log(loading)

    useEffect(() => {
      fetchSomeData()
    }, [])

    return (
        <div>
            Test Page
        </div>
    )
}

export default Test
