import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();      {/** this is where the data layer resides */}

export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer (reducer, initialState)}>    {/** setting up the data layer */}
        {children}     {/** The App */} 
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); {/** pulling information from the data layer */}