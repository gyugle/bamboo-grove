import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

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
    }
  };

  // Make firebase Sign-up method
  const onSubmit = (event) => {
    event.preventDefault();
    if (password === confPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Passwords do not match!!');
    }
  };

  return (
    <div>
      <h3>Sign up page</h3>
      <button onClick={() => navigate(-1)}>BACK</button>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
          name="confPassword"
          required
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
