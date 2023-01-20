import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useEffect } from 'react';

export const AuthContext = createContext()

const auth = getAuth(app)
const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(false)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            setUser(currentuser)
        });

        return () => unsubscribe();

    }, [])
    const authinfo = { user, loading, createUser, signIn, logOut }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;