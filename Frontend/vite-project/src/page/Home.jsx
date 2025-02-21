import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2795/register",
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2795/login",
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  const handleAccessProtected = async () => {
    try {
      const response = await axios.get("http://localhost:2795/protected", {
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:2795/logout",
        {},
        { withCredentials: true }
      );
      setMessage("Logged out successfully...");
      setIsAuthenticated(false);
    } catch (error) {
      setMessage("Error during logout");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ textAlign: "center", marginTop: "50px"  , color:"pink"}}>JWT Authentication </h2>

      {/* حقول الإدخال لتسجيل المستخدم */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "10px" }}
        />
      </div>

      {/* أزرار العمليات */}
      <div>
        <button onClick={handleRegister} style={{ margin: "5px" }}>
          Register
        </button>
        <button onClick={handleLogin} style={{ margin: "5px" }}>
          Login
        </button>

        {isAuthenticated && (
          <>
            <button onClick={handleAccessProtected} style={{ margin: "5px" }}>
              Access Protected
            </button>
            <button onClick={handleLogout} style={{ margin: "5px" }}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* عرض الرسالة المستلمة من الخادم */}
      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default Home;
