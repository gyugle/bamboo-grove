import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from 'firebase/auth';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { auth } from '../firebase';
import bambooIcon from '../icon/bamboo.png';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();
  const currentYear = new Date();

  const onChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confPassword') {
      setConfPassword(value);
    } else if (name === 'nickname') {
      setNickname(value);
    }
  };

  // Make firebase Sign-up method
  const onSubmit = (event) => {
    event.preventDefault();
    if (password === confPassword) {
      setPersistence(auth, browserSessionPersistence)
        .then(() =>
          createUserWithEmailAndPassword(auth, email, password).then((user) => {
            updateProfile(user.user, { displayName: nickname });
            navigate('/');
          })
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert('Passwords do not match!!');
    }
  };

  return (
    <div className="signup_main">
      <Logo />

      <form onSubmit={onSubmit} className="signup_form">
        <div className="signup_property">
          <div className="signup_label">Nickname</div>
          <input
            className="signup_input"
            onChange={onChange}
            value={nickname}
            type="text"
            placeholder="Nickname"
            name="nickname"
            maxLength="20"
            required
          />
        </div>
        <div className="signup_property">
          <div className="signup_label">Email</div>
          <input
            className="signup_input"
            onChange={onChange}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div className="signup_property">
          <div className="signup_label">Password</div>
          <input
            className="signup_input"
            onChange={onChange}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div className="signup_property">
          <div className="signup_label">Confirm Password</div>
          <input
            className="signup_input"
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            name="confPassword"
            required
          />
        </div>
        <button className="signup_btn">SIGN UP</button>
      </form>
      <footer className="signup_footer">
        &copy;{currentYear.getFullYear()} BAMBOO GROVE
      </footer>
    </div>
  );
}

export default SignUp;
