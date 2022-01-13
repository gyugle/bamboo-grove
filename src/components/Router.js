import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
import Profile from '../routes/Profile';

const AppRouter = ({ isUser, userInfo, callUser }) => {
  return (
    <div>
      <Router>
        <Routes>
          {isUser ? (
            <Route path="/" element={<Home userInfo={userInfo} />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
          <Route
            path="/profile"
            element={<Profile userInfo={userInfo} callUser={callUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
