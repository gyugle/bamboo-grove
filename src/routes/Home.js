import React, { useEffect, useState } from 'react';
import bucket, { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Posting from '../components/Posting';
import ShowPostings from '../components/ShowPostings';
import defaultImage from '../img/default.png';
import Navbar from '../components/Navbar';
import bambooIcon from '../icon/bamboo.png';
import Logo from '../components/Logo';

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
    <div className="home_main">
      <div className="home_top">
        <Logo />

        <div className="home_header">
          <div className="home_profile">
            {imgUrl ? (
              <img src={imgUrl} alt="profile" />
            ) : (
              <img src={defaultImage} alt="profile" />
            )}
            <label> {name}</label>
          </div>
          <div>
            <Posting userInfo={userInfo} />
          </div>
        </div>
      </div>
      <div className="home_body">
        <ShowPostings userInfo={userInfo} />
      </div>

      <Navbar />
    </div>
  );
}

export default Home;
