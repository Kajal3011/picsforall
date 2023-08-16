import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';


function Plus() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    function handlePayment() {
        if (!user) {
            navigate('/login');
            return
        }

        fetch('/checkout-session', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ id: 1, quantity: 1 })
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => window.location.href = url)
            .catch(e => console.log(e));
    }

    return (
        <>
            <div className='container'>
                <h1>Plus membership</h1>
                <br />
                <button className='btn btn-success' onClick={handlePayment}>Buy Now</button>
            </div>
        </>
    )
}

export default Plus