/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [count, setCount] = useState(1)
    const [ep,setEp] = useState({})

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    };


    return (
        <AuthContext.Provider value={{
            count,
            incrementCount,
            ep,
            setEp
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

