import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from '../components/Gallery'
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';

function SearchPage() {
  const { query } = useParams();
  const url = `${baseUrl}/api/posts/search/${query}`;
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(response => {
        setData(response)
        // console.log(response);
      })
      .catch(e => console.log(e.message));
  }, [query, url]);

  console.log(data);

  return (
    <div>
      <h1>{query}</h1>
      {data && <Gallery data={data} setData={setData} />}
    </div>
  )
}

export default SearchPage