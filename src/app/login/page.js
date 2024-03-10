"use client";

import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import GoogleSignInButton from './logo';
import './page.css';

export default function Login() {

  const { login } = useContext(AuthContext);

  return (
    <div>
      <GoogleSignInButton onClick={() => login()} />
    </div>
  );
}


