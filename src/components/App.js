import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from '../components/Router';
import { auth } from '../firebase';
function App() {
  const [isUser, setIsUser] = useState(false);

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }),
    []
  );
  return (
    <div>
      <AppRouter isUser={isUser} />
    </div>
  );
}

export default App;
