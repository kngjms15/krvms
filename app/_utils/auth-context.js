// auth-context.js

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Ensure this points to your Firebase config file
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user); 
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const emailSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const firebaseSignOut = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, emailSignIn, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

