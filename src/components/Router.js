import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
import Profile from '../routes/Profile';
import MyPostings from '../routes/MyPostings';
import Loading from './Loading';

const AppRouter = ({ isUser, userInfo, pageLoad }) => {
  return (
    <div>
      <Router>
        <Routes>
          {!pageLoad ? (
            <Route path="/" element={<Loading />} />
          ) : isUser ? (
            <Route path="/" element={<Home userInfo={userInfo} />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/mypostings"
            element={<MyPostings userInfo={userInfo} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
