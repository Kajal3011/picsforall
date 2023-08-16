import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Gallery from '../components/Gallery';
import UserInfoBox from '../components/UserInfoBox';
const baseUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'https://picsforall-backend.onrender.com';

function UserProfile({ val }) {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  // const userUrl = `https://api.unsplash.com/users/${userName}/${val}?client_id=${clientKey}`;

  useEffect(() => {
    fetch(`${baseUrl}/api/user/${val}/${username}`)
      .then(res => res.json())
      .then(response => {
        setUserInfo(response);
        // console.log(response);
      })
      .catch(e => console.log(e));
  }, [val, username]);

  // console.log(user);
  // console.log(user.photos);
  // const data = user.photos;
  return (
    <>
      <UserInfoBox />

      <nav>
        <NavLink
          className={({ isActive }) => isActive ? 'active-topic topic-link' : 'topic-link'}
          to={`../user/${username}`}
        >
          🖼 Photos {userInfo?.total_photos}
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'active-topic topic-link' : 'topic-link'}
          to={`../likes/${username}`}
        >
          ❤ Likes {userInfo?.total_likes}
        </NavLink>
      </nav>
      {userInfo && <Gallery data={userInfo} setData={setUserInfo} />}
    </>
  )
}

export default UserProfile