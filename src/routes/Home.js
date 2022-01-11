import React from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Posting from '../components/Posting';
import ShowPostings from '../components/ShowPostings';
import defaultImage from '../img/default.jpg';

function Home({ userInfo }) {
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div>
      <h3>Welcome to Bamboo Grove!</h3>
      <img src={defaultImage} width="80px" height="80px" alt="profile" />
      <Link to="/profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={logOut}>LogOut</button>

      <Posting userInfo={userInfo} />

      <hr />
      <ShowPostings userInfo={userInfo} />
      <hr />
    </div>
  );
}

export default Home;
