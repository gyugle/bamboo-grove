import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from '../components/Router';
import { auth } from '../firebase';
import '../css/style.css';
import '../font/font.css';
function App() {
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        setUserInfo(user);
      } else {
        setIsUser(false);
      }
      setPageLoad(true);
    }),
    []
  );
  return (
    <div className="app">
      <AppRouter isUser={isUser} pageLoad={pageLoad} userInfo={userInfo} />
    </div>
  );
}

export default App;
