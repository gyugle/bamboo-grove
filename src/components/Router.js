import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
const AppRouter = ({ isUser }) => {
  return (
    <div>
      <Router>
        <Routes>
          {isUser ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}

          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
