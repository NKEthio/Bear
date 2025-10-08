import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase"; // Adjust path
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import "../styles/Auth.css";

function Signup() {
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
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  // Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        score: 0, // Default score
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const defaultUsername = user.email.split("@")[0];
      await updateProfile(user, { displayName: defaultUsername });
      await setDoc(doc(db, "users", user.uid), {
        username: defaultUsername,
        email: user.email,
        score: 0, // Default score
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };


  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign up with Google
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;