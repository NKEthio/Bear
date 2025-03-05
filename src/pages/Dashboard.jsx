import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Adjust path
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css"; // We’ll create this next

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch and sort users by score
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort by score descending
        const sortedUsers = userList.sort((a, b) => (b.score || 0) - (a.score || 0));
        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleLogout = async () => {
  //   await auth.signOut();
  //   navigate("/login");
  // };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {/* <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
      <div className="user-list">
        <h3>Leaderboard</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Rank</th><th>Username</th><th>Score</th></tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr  key={user.id}><td>{index + 1}</td> {/* Rank based on position */}<td>{user.username}</td><td>{user.score || 0}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};