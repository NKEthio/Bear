import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase"; // Adjust path
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New username field
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid credentials. Check your email or password.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  // Handle Email/Password Login with Username Validation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Validate username against Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().username === username) {
        navigate("/");
      } else {
        await auth.signOut(); // Sign out if username doesn’t match
        setError("Incorrect username.");
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <p>
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;