import React, { useEffect, useState } from 'react';
import bucket, { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Posting from '../components/Posting';
import ShowPostings from '../components/ShowPostings';
import defaultImage from '../img/default.jpg';
import Navbar from '../components/Navbar';

function Home({ userInfo }) {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const callUser = () => {
    onAuthStateChanged(auth, (user) => {
      setName(user.displayName);
      setImgUrl(user.photoURL);
    });
  };
  useEffect(() => {
    callUser();
  }, []);

  return (
    <div>
      <h3>Welcome to Bamboo Grove!</h3>
      {imgUrl ? (
        <img src={imgUrl} width="120px" height="90px" alt="profile" />
      ) : (
        <img src={defaultImage} width="120px" height="90px" alt="profile" />
      )}
      <span> {name}</span>
      <div>
        <Link to="/profile">
          <button>Edit Profile</button>
        </Link>
        <button onClick={logOut}>LogOut</button>
      </div>
      <div>
        <Posting userInfo={userInfo} />
      </div>
      <hr />
      <div>
        <ShowPostings userInfo={userInfo} />
      </div>
      <hr />
      <Navbar />
    </div>
  );
}

export default Home;
