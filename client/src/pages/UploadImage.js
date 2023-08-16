import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';

function UploadImage() {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');

  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return
    }

    if (!description || !tags || !image) {
      alert('All fields must be filled')
      return;
    }

    let formData = new FormData();
    formData.append('username', user.username);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const response = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      });

      // const json = await response.json();
      if (!response.ok)
        throw new Error('Something went wrong. Please try again');
      else
        navigate(-1, { replace: true })
      // (json) ? navigate(-1) : alert('Something went wrong. Please try again')
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <h1 className='m-4 text-center'>Submit a photo</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Upload an image</label>
            <input
              className="form-control"
              onChange={e => setImage(e.target.files[0])}
              type="file"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form-control"
              rows="3"
              placeholder='Short description of an image'
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tags
              <small className='text-secondary'> (separated by comma)</small>
            </label>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3 mt-4">
            <button type='submit' className='btn btn-dark w-100'>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UploadImage