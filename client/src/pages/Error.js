import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <>
            <div className="container" style={{ height: "100vh" }}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <h1>ERROR 404</h1>
                    <h3 className='mb-3'>Page not found</h3>
                    {/* <button '> */}
                    <Link className='btn btn-primary' to={'/'} > Go Home </Link>
                    {/* </button> */}
                </div>
            </div>
        </>

    )
}

export default Error