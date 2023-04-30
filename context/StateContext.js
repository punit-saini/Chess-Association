import React, { createContext, useContext, useState} from 'react'


const Context = createContext()


export const StateContext = ({ children }) => {
    const [formData, setFormData] = useState({})

    return (
        <Context.Provider 
           value={
             {
                formData,
                setFormData,
             }
           }
           >
            {children}
           </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);