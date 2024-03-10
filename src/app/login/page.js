"use client";

import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import GoogleSignInButton from './logo';
import './page.css';
import { redirect } from 'next/navigation'

export default function Login() {

  const { user, login, authReady } = useContext(AuthContext);

  return (
    <>
    {
      authReady ? <div>
      {
        user === null ? 
        <GoogleSignInButton onClick={() => login()} />
        :
        redirect('/')
      }
      </div> : <div>
        Loading...
    </div>
    }
    </>
  );
}


