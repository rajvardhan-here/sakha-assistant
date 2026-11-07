import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";
import { setGoogleToken, getGoogleToken, clearGoogleToken } from "../googleToken.js";
import AuthContext from "./authContext.js";

const describeAuthError = (error) => {
  const code = error?.code || "unknown";
  const messages = {
    "auth/unauthorized-domain":
      "This website's domain isn't authorized in Firebase yet. (Firebase → Authentication → Settings → Authorized domains)",
    "auth/popup-blocked":
      "Your browser blocked the login popup. Please allow popups for this site and try again.",
    "auth/popup-closed-by-user": "Login popup was closed before finishing. Please try again.",
    "auth/cancelled-popup-request": "Another login popup was already open. Please try again.",
    "auth/operation-not-allowed":
      "Google Sign-In is not enabled in Firebase. (Firebase → Authentication → Sign-in method → Google)",
    "auth/invalid-api-key": "Firebase API key is missing or invalid in this deployment.",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      "Firebase API key is missing or invalid in this deployment.",
    "auth/network-request-failed": "Network error. Please check your internet and try again.",
    "auth/internal-error": "Internal Firebase error. Please try again in a moment.",
  };
  return `${messages[code] || "Google Sign-In failed."} (${code})`;
};

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

  // Basic login — no sensitive scopes, works for everyone.
  const loginWithGoogle = async () => {
    try {
      setAuthError("");
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setAuthError(describeAuthError(error));
      throw error;
    }
  };

  // Optional step from Settings — requests Calendar permission.
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
      console.error("Calendar connect error:", error.code, error.message);
      setAuthError(describeAuthError(error));
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

export { useAuth } from "./authContext.js";