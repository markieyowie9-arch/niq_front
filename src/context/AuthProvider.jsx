"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import dataProvider from "@/utils/dataProvider";
import { isConfigured, auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = null;
    if (isConfigured() && auth) {
      unsub = onAuthStateChanged(auth, (u) => {
        setUser(u ? { uid: u.uid, email: u.email } : null);
        setLoading(false);
      });
    } else {
      // No firebase configured — use mock mode
      setLoading(false);
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const signIn = async (email, password) => {
    const u = await dataProvider.signIn(email, password);
    setUser(u);
    return u;
  };

  const signUp = async (email, password) => {
    const u = await dataProvider.signUp(email, password);
    setUser(u);
    return u;
  };

  const signOut = async () => {
    await dataProvider.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
