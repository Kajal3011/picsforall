import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import './gallery.css';
import Avatar from './Avatar';

function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setQuery(e.target.value);
    // console.log(query);
  }

  function handleSearch() {
    navigate(`/s/photos/${query}`);
  }

  function handleClick() {
    user ? navigate('/upload') : navigate('/login')
  }

  return (
    <>
      <nav className="navbar align-items-center mobile">
        <Link to={'/'} className="navbar-brand ms-2 ps-1">
          PFA
        </Link>

        <form onSubmit={e => e.preventDefault()} className='w-50' role="search">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search images"
              aria-label="Search"
              aria-describedby="mobile-search-btn"
            />
            <button
              onClick={handleSearch}
              className="btn btn-outline-secondary btn-sm"
              type="submit"
              id="mobile-search-btn"
            >
              🔍
            </button>
          </div>
        </form>

        <div className=' me-2 pe-1'>
          {
            user
              ?
              <div className="btn-group">
                <span
                  role='button'
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                >
                  <Avatar w='2.125rem' ch={user?.username[0]} str={user?.username} />
                </span>
                <ul className="dropdown-menu dropdown-menu-start" style={{ translate: '-80%' }}>
                  <li><Link to={`../user/${user?.username}`} className="dropdown-item">View Profile</Link></li>
                  <li><button onClick={handleClick} className="dropdown-item">Submit a photo</button></li>
                  <li><Link to={'/plus'} className="dropdown-item text-info">Picsforall+</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className='dropdown-item' onClick={() => logout()}>Logout @{user?.username}</button></li>
                </ul>
              </div>
              :
              <Link className='btn btn-outline-dark' to={'/login'}>Login</Link>
          }
        </div>
      </nav >


      <nav className="navbar align-items-center desktop">
        <Link to={'/'} className="navbar-brand ms-3">
          PicsForAll
        </Link>

        <form onSubmit={e => e.preventDefault()} className='w-50' role="search">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search images"
              aria-label="Search"
              aria-describedby="desktop-search-btn"
            />
            <button
              onClick={handleSearch}
              className="btn btn-dark"
              type="submit"
              id="desktop-search-btn"
            >
              Search
            </button>
          </div>
        </form>
        <button type="button" onClick={() => navigate('/plus')} className="btn btn-outline-info">PicsForAll+</button>
        <button type="button" onClick={handleClick} className="btn btn-outline-dark">Submit a photo</button>
        <div className=' me-3'>
          {
            user
              ?
              <div className="btn-group">
                <span
                  role='button'
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                >
                  <Avatar w='2.125rem' ch={user?.username[0]} str={user?.username} />
                </span>
                <ul className="dropdown-menu dropdown-menu-start" style={{ translate: '-80%' }}>
                  <li><Link to={`../user/${user?.username}`} className="dropdown-item">View Profile</Link></li>
                  <li><button onClick={handleClick} className="dropdown-item">Submit a photo</button></li>
                  <li><Link to={'/plus'} className="dropdown-item text-info">Picsforall+</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className='dropdown-item' onClick={() => logout()}>Logout @{user?.username}</button></li>
                </ul>
              </div>
              :
              <Link className='btn btn-outline-dark' to={'/login'}>Login</Link>
          }
        </div>
      </nav >
    </>
  )
}

export default Header;