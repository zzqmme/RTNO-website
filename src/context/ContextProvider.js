"use client"

import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    const [selectedUserId, setSelectedUserId] = useState(null)
    
    return (
        <StateContext.Provider
            value={{ 
                activeMenu,
                setActiveMenu,
                screenSize,
                setScreenSize,
                selectedUserId,
                setSelectedUserId
             }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);