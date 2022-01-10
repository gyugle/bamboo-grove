import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Home() {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <div>
      <h3>Welcome HOME</h3>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
}

export default Home;
