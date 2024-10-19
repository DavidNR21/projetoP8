/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [count, setCount] = useState(1);

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };


    return (
        <AuthContext.Provider value={{
            count,
            incrementCount
        }} >
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider
