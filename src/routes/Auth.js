import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

import mailIcon from '../icon/email.png';
import passwordIcon from '../icon/password.png';
import bambooIcon from '../icon/bamboo.png';
import Logo from '../components/Logo';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date();

  const onChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Make firebase login method
  const onSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Sign in');
  };
  return (
    <div className="auth_main">
      <Logo />
      <div>
        <form onSubmit={onSubmit} className="auth_form">
          <div className="auth_email">
            <img src={mailIcon} alt="email" className="icon" />
            <input
              onChange={onChange}
              value={email}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="auth_password">
            <img src={passwordIcon} alt="password" className="icon" />
            <input
              onChange={onChange}
              value={password}
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <button className="auth_loginBtn">LOG IN</button>
        </form>

        <Link to="/signup">
          <span>SIGN UP</span>
        </Link>
      </div>
      <footer className="auth_footer">
        &copy;{currentYear.getFullYear()} BAMBOO GROVE
      </footer>
    </div>
  );
};

export default Auth;
