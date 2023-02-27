import "./index.css";
import { useState, useEffect } from "react";
import { auth } from "./firebaseClient";
import Auth from "./Auth";
import Account from "./Account";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!user ? <Auth /> : <Account user={user} />}
    </div>
  );
}
