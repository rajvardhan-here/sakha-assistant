import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";
import { setGoogleToken, getGoogleToken, clearGoogleToken } from "../googleToken.js";
import AuthContext from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarConnected, setCalendarConnected] = useState(!!getGoogleToken());
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      setCalendarConnected(!!getGoogleToken());
    });
    return unsubscribe;
  }, []);

  // Basic login — NO sensitive scopes. Works for everyone, no verification warning.
  const loginWithGoogle = async () => {
    try {
      setAuthError("");
      const result = await signInWithPopup(auth, googleProvider);
      // no calendar scope requested here at all
      return result;
    } catch (error) {
      setAuthError("Google Sign-In could not start. Please try again.");
      throw error;
    }
  };

  // Separate, optional step — only called when user clicks "Connect Calendar" in Settings.
  const connectCalendar = async () => {
    try {
      setAuthError("");
      googleProvider.addScope("https://www.googleapis.com/auth/calendar");
      googleProvider.setCustomParameters({ prompt: "consent" });

      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential?.accessToken) {
        setGoogleToken(credential.accessToken);
        setCalendarConnected(true);
      }
    } catch (error) {
      const message =
        error?.code === "auth/unauthorized-domain"
          ? "This domain isn't authorized yet. Contact the developer."
          : "Couldn't connect Google Calendar. Please try again.";
      setAuthError(message);
      throw error;
    }
  };

  const logout = () => {
    clearGoogleToken();
    setCalendarConnected(false);
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, connectCalendar, logout, calendarConnected, authError, setAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
}