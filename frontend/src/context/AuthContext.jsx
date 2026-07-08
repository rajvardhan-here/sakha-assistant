import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";
import { setGoogleToken, getGoogleToken, clearGoogleToken } from "../googleToken.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarConnected, setCalendarConnected] = useState(!!getGoogleToken());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      setCalendarConnected(!!getGoogleToken());
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    googleProvider.addScope("https://www.googleapis.com/auth/calendar");
    googleProvider.setCustomParameters({ prompt: "consent" });

    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential?.accessToken) {
      setGoogleToken(credential.accessToken);
      setCalendarConnected(true);
    }
  };

  const logout = () => {
    clearGoogleToken();
    setCalendarConnected(false);
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, calendarConnected }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);