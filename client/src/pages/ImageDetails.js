import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FileDownload from 'js-file-download';
// import Error from './Error';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from '../components/Avatar';
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';


function ImageDetails() {
    const { state } = useLocation();
    const [isLike, setIsLike] = useState(state ? state.isLike : false);
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `${baseUrl}/api/posts/photos/${id}`;
    const [imgDetail, setImgDetail] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(response => setImgDetail(response))
            .catch(e => console.log(e));
    }, [url, user]);


    function downloadImage(id, filename) {
        fetch(`${baseUrl}/api/posts/download/${id}`)
            .then(res => res.blob())
            .then(response => {
                FileDownload(response, filename);
            })
            .catch(e => console.log(e));
    }

    function likePost(postId, username) {
        if (!user) {
            navigate('/login');
            return
        }
        fetch(`${baseUrl}/api/posts/like`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ postId, username })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setIsLike(true);
            })
            .catch(e => console.log(e.message))
    }
    function unlikePost(postId, username) {
        if (!user) {
            navigate('/login');
            return
        }
        fetch(`${baseUrl}/api/posts/unlike`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ postId, username })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setIsLike(false);
            })
            .catch(e => console.log(e.message))
    }

    return (
        <>
            {console.log(imgDetail, 80)}
            {/* {setIsLike(imgDetail.liked_by.includes(user.username))} */}
            {imgDetail.user &&

                <div className="container">
                    <div className="d-flex justify-content-between mt-3 mb-2 pb-1">
                        <div role='button' name={imgDetail.user.username} onClick={() => navigate(`../user/${imgDetail.user.username}`)}>
                            <Avatar w='32px' ch={imgDetail.user.fName[0]} str={imgDetail.user.username} />
                            <span className='ms-2' >{imgDetail.user.fName + " " + imgDetail.user.lName}</span>
                        </div>

                        <button className="btn btn-success btn-sm" onClick={() => downloadImage(imgDetail._id, imgDetail.user.fName + '-' + imgDetail._id + '.jpg')}>Download</button>

                    </div>
                </div>
            }
            {/* <div className='flex-container'>
                    <div className='profil' onClick={() => navigate(`../user/${imgDetail.user.username}`)}>
                        <img width="50px" className='profile-img' src={avatarUrl} alt='user' />
                        <span className='profile-name' >{imgDetail.user.fName + " " + imgDetail.user.lName}</span>
                    </div>

                    <div>
                        {
                            (user && isLike) ?
                                <button className='btn btn-outline-danger me-2' onClick={() => user ? unlikePost(imgDetail._id, user.username) : navigate('/login')} > ❤ </button>
                                :
                                <button className='btn btn-outline-secondary me-2' onClick={() => user ? likePost(imgDetail._id, user.username) : navigate('/login')} > ❤ </button>
                        }
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Download free
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => downloadImage(imgDetail._id, imgDetail.user.fName + '-' + imgDetail._id + '.jpg')}>Small</button></li>
                            <li><button className="dropdown-item" name={imgDetail.user.fName + '-' + imgDetail._id + '.jpg'} value={imgDetail.image} >Medium</button></li>
                            <li><button className="dropdown-item" name={imgDetail.user.fName + '-' + imgDetail._id + '.jpg'} value={imgDetail.image} >Large</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" name={imgDetail.user.fName + '-' + imgDetail._id + '.jpg'} value={imgDetail.image} >Original Size</button></li>
                        </ul>
                    </div>

                </div> */}


            <img className='img-det' src={imgDetail?.image} alt='xyz' />


            {imgDetail && <div className="container">
                <div className="d-flex justify-content-between mt-2 mb-3 pt-1">
                    <div>
                        {
                            /* {user && x.liked_by.includes(user.username)} */
                            (user && isLike) ?
                                <button className='btn btn-danger btn-sm' onClick={() => user ? unlikePost(imgDetail._id, user.username) : navigate('/login')} > ❤ </button>
                                :
                                <button className='btn btn-outline-danger btn-sm' onClick={() => user ? likePost(imgDetail._id, user.username) : navigate('/login')} > ❤ </button>
                        }


                        {user && imgDetail.user && (user.username === imgDetail.user?.username) &&
                            <button className='btn btn-outline-secondary btn-sm ms-2' onClick={() => navigate('/edit', {
                                state: {
                                    id: imgDetail._id,
                                    description: imgDetail.description,
                                    tags: imgDetail.tags,
                                    location: imgDetail.location
                                }
                            })}>
                                Edit 🖋
                            </button>}
                    </div>

                    <button className="btn btn-outline-dark btn-sm" onClick={() => {
                        navigator.clipboard.writeText(`${window.location.href}`);
                        alert('Link copied to clipboard');
                    }}>➦ Share</button>

                </div>

                <div className='mb-3'>
                    <h4 className='mb-3'>{imgDetail?.description}</h4>
                    <span className='text-secondary d-block'>📍 {imgDetail?.location}</span>
                    <span className='text-secondary d-block'>📅 Published on {new Date(imgDetail?.date).toLocaleDateString()}</span>
                    <span className='text-secondary d-block'>🛡 Free to use under the PicsForAll License</span>
                </div>

                {imgDetail.tags &&
                    <div className='pt-2 mb-2'>
                        {imgDetail.tags.map((tag, i) => {
                            return <button className='btn btn-light bg-secondary-subtle btn-sm me-2 mb-2' disabled key={i}>{tag}</button>
                        })}
                    </div>
                }

            </div>
            }
            {/* <div className='flex-container'>
                <div>
                    <span className='pe-5'>Views: {imgDetail?.views}</span>
                    <span>Downloads: {imgDetail?.downloads}</span>
                </div>

                <div>
                    <button className='btn me-2 btn-outline-secondary' onClick={() => {
                        navigator.clipboard.writeText(`${window.location.href}`);
                        alert('Link copied to clipboard');
                    }}>➦ Share</button>

                    <button className="btn me-2 btn-outline-secondary">ℹ Info</button>
                </div>
            </div> */}


            {/* <div className='m-1 ps-3 pe-3'>
                {imgDetail.description && <h4>{imgDetail.description}</h4>}
                {imgDetail.location && <p>📍 {imgDetail.location}</p>}
                {imgDetail.date && <p>📅 Published on {new Date(imgDetail.date).toLocaleDateString()}</p>}
                <p>🛡 Free to use under the PicsForAll License</p>
            </div> */}
        </>
    )
}

export default ImageDetails