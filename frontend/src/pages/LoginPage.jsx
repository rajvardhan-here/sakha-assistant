import { useAuth } from "../context/useAuth.js";

function LoginPage() {
  const { loginWithGoogle, authError, setAuthError } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch {
      // Error is surfaced through authError.
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">✦ SAKHA</div>
        <p className="login-subtitle">Your friendly AI assistant</p>
        {authError ? <p className="login-error">{authError}</p> : null}
        <button
          className="google-btn"
          onClick={handleLogin}
          onMouseDown={() => setAuthError("")}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;