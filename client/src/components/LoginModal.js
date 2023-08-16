import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

function LoginModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  // const navigate = useNavigate();


  const handleSubmit = async function (e) {
    try {
      e.preventDefault();
      await login(email, password)
      props.doNextTask();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='login' onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                  type='email'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
                <label>Password:</label>
                <input
                  type='password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
                {/* <button className='btn btn-dark' disabled={isLoading}>Login</button> */}

                {error && <div className='error'>{error}</div>}

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button className='btn btn-dark' disabled={isLoading}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal