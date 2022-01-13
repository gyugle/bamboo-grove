import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from '../components/Router';
import { auth } from '../firebase';

function App() {
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const currentYear = new Date();
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
    <div>
      <AppRouter isUser={isUser} userInfo={userInfo} />

      <footer>&copy;{currentYear.getFullYear()} BAMBOO GROVE</footer>
    </div>
  );
}

export default App;
