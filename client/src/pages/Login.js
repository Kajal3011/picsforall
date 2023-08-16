import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            await login(email, password)
            !error && navigate(-1, { replace: true })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="container">
            <h1 className='m-4 text-center'>Login</h1>
            <form className='login' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    {error && <div className='text-danger mb-3'><b>{error}</b></div>}
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-dark w-100' disabled={isLoading}>Login</button>
                </div>
                <div className="mb-3">
                    <button type='submit' onClick={() => {
                        setEmail('test1@user.com');
                        setPassword('ABCabc123!');
                    }}
                        className='btn btn-outline-dark w-100'
                        disabled={isLoading}>
                        Login as a Test User
                    </button>
                </div>
            </form>
            <div className="mb-3 text-center">
                <p>Don't have an account?
                    <span className='link-primary' role='button' onClick={() => navigate('/signup', { replace: true })}>Join</span>
                </p>
            </div>
        </div>
    )
}

export default Login