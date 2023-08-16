import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';
import './css/styles.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Signup() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();


    const handleSubmit = async function (e) {
        e.preventDefault();
        // console.log(email, password)
        try {
            await signup(fName, lName, email, username, password);
            navigate('/', { replace: true })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="container">
            <h1 className='m-4 text-center'>Join PicsForAll</h1>
            <div className="mt-3 mb-3 text-center">
                <p>Already have an account?
                    <span className='link-primary' role='button' onClick={() => navigate('/login', { replace: true })}> Login</span>
                </p>
            </div>
            <br />
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                    <label className="form-label">First name</label>
                    <input
                        type='text'
                        onChange={e => setFName(e.target.value)}
                        value={fName}
                        className="form-control"
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Last name</label>
                    <input
                        type='text'
                        onChange={e => setLName(e.target.value)}
                        value={lName}
                        className="form-control"
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="form-control"
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Username</label>
                    <input
                        type='text'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        className="form-control"
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="form-text">
                        Your password must be min. 8 characters long and contain letters and numbers.
                    </div>
                </div>
                <div className="col-12">
                    {error && <div className='text-danger'><b>{error}</b></div>}
                </div>
                <div className="col-12">
                    <button type='submit' className='btn btn-dark w-100' disabled={isLoading}>Join</button>
                </div>
            </form>

        </div>

    )
}

export default Signup