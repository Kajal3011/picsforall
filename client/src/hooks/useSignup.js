import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const signup = async function (fName, lName, email, username, password) {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${baseUrl}/api/user/signup`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ fName, lName, email, username, password })
        })

        const json = await response.json();
        console.log(json);

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            throw Error(json.error);
        }

        if (response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update authContext
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error }
}
