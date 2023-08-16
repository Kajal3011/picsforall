import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const login = async function (email, password) {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
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
            // navigate(1);
        }
    }

    return { login, isLoading, error }
}
