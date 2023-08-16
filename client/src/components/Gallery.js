import React from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom'
import './gallery.css';
import FileDownload from 'js-file-download';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';


function Gallery(props) {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  // console.log(props);
  const { data, setData } = props;

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
        const newData = data.map(posts => {
          if (posts._id === response._id)
            return response;
          else
            return posts
        })
        setData(newData);
        console.log(response);
      })
      .catch(e => console.log(e.message))
    // setLike(!isLike);
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
        const newData = data.map(posts => {
          if (posts._id === response._id)
            return response;
          else
            return posts
        })
        setData(newData);
        console.log(response);
      })
      .catch(e => console.log(e.message))
    // setLike(!isLike);
  }

  return (
    <>
      <div className='container'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter={"1.5rem"}>
            {
              data && data.map(x => {
                return <div className='pos position-relative' key={x._id}>
                  <div className="card border border-0">
                    <div className='overlay' onClick={() => navigate(`/photos/${x._id}`, {
                      state: {
                        isLike: (x.liked_by.includes(x.user.username))
                      }
                    })}></div>
                    <div className="card-header bg-transparent p-2">

                      <div className='profile' name={x.user.username} onClick={() => navigate(`../user/${x.user.username}`)}>
                        <Avatar w='25px' ch={x.user.fName[0]} str={x.user.username} />
                        <span className='ms-2' >{x.user.fName + " " + x.user.lName}</span>
                      </div>

                    </div>

                    <img className='card-img-top d-block' src={x.image} alt='...' onClick={() => navigate(`/photos/${x._id}`, {
                      state: {
                        isLike: (x.liked_by.includes(x.user.username))
                      }
                    })} />

                    <div className="card-body p-2">
                      <div className="d-flex justify-content-between">
                        <div>
                          {user && x.liked_by.includes(user.username)
                            ?
                            <button className='btn btn-outline-danger btn-sm like-btn' onClick={() => user ? unlikePost(x._id, user.username) : navigate('/login')} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                              </svg>
                            </button>
                            :
                            <button className='btn btn-outline-danger btn-sm like-btn' onClick={() => user ? likePost(x._id, user.username) : navigate('/login')} > ❤ </button>
                          }

                          {user && (user.username === x.user.username) && <button className='btn btn-outline-dark btn-sm edit-btn ms-2' onClick={() => navigate('/edit', {
                            state: {
                              id: x._id,
                              description: x.description,
                              tags: x.tags,
                              location: x.location
                            }
                          })}>
                            Edit 🖋
                          </button>}
                        </div>
                        <button className="btn btn-dark btn-sm download-btn" onClick={() => downloadImage(x._id, x.user.fName + '-' + x._id + '.jpg')}>Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </Masonry>
        </ResponsiveMasonry>
      </div >
    </>
  )
}

export default Gallery