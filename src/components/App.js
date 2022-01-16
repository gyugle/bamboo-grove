import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from '../components/Router';
import { auth } from '../firebase';
import '../css/style.css';

function App() {
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        setUserInfo(user);
      } else {
        setIsUser(false);
      }
    }),
    []
  );
  return (
    <div className="app">
      <AppRouter isUser={isUser} userInfo={userInfo} />
    </div>
  );
}

export default App;
