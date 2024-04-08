'use client'

import React from 'react';
import Link from 'next/link';
import ApplicantsListPage from '@/pages/applicantsList/page';
import Dashboard from './dashboard/page';
import { AuthContextProvider, useUserAuth } from './_utils/auth-context';

const { user, logout } = useUserAuth();

async function handleSignIn(){
  const { emailSignIn } = useUserAuth();

    try{
        await emailSignIn();
    } catch(error){
        console.log(error);
    }
}

async function handleSignOut(){
  const { firebaseSignOut } = useUserAuth();

    try{
        await firebaseSignOut();
    } catch(error){
        console.log(error);
    }
}
 
export default function Page() {
  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleSignOut}>Logout</button>
          <Dashboard/>
        </div>
      ) : (
        <div>
          <Link href="/login" onClick={handleSignIn}>Login</Link>
        </div>
      )}
      
    </div>
  );
}

