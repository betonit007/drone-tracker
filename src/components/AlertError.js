import React from 'react'

const AlertError = ({error}) => {
    return (
        <div className='w-full max-w-xs bg-red-600 rounded text-white absolute inset-x-0 mx-auto z-10 text-center'>
            {error && error}
        </div>
    )
}

export default AlertError
