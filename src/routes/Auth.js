import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <h3>AUTH</h3>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          onChange={onChange}
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button>LOG IN</button>
      </form>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Auth;
