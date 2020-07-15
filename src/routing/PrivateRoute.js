import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//This is very common setup for creating a private route component

const PrivateRoute = ({ authState, component: Component, ...rest }) => {  //destructoring and taking a component and setting it to Component and then anything else thats passed in (...rest operator) Standard way to set a private route component
    
    return (
        <Route { ...rest } render={props => !authState ? (  //...rest passes in any extra props and then add a render that will take props. if user is not authenicated and the state is done loading then redirect to login page (they're not authenticated)
            <Redirect to='/' />
        ) : (
            <Component authState={authState} {...props} /> // if user is logged in then load whatever the component is and its props
        )} />  
            
    )
};

export default PrivateRoute;