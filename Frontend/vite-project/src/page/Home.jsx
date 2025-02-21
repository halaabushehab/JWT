


// import React from "react";
// import axios from "axios";
// import { useState } from "react";

// function Home() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isAuthenticates, setIsAuthenticates] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     console.log("Register button clicked");
//     try {
//       const response = await axios.post(
//         "http://localhost:2700/register",
//         { username, password },
//         { withCredentials: true }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//  setMessage("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:2700/login",
//         { username, password },
//         { withCredentials: true }
//       );
//       setMessage(response.data.message);
//       setIsAuthenticates(true);
//     } catch (error) {
//       setMessage("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleAccessProtected = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:2700/protected",
//         {},
//         { withCredentials: true }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:2700/logout", {}, { withCredentials: true });
//       setMessage("logged out successfully...");
//       setIsAuthenticates(false);
//     } catch (error) {
//       setMessage("Error during logout");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>JWT Authentication Demo</h2>

//       {/* حقول الإدخال لتسجيل المستخدم */}
//       <div>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{ margin: "10px" }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ margin: "10px" }}
//         />
//       </div>

//       {/* أزرار العمليات */}
//       <div>
//         <button onClick={handleRegister} style={{ margin: "5px" }}>
//           Register
//         </button>
//         <button onClick={handleLogin} style={{ margin: "5px" }}>
//           Login
//         </button>

//         {isAuthenticates && (
//           <>
//             <button onClick={handleAccessProtected} style={{ margin: "5px" }}>
//               Access Protected
//             </button>
//             <button onClick={handleLogout} style={{ margin: "5px" }}>
//               Logout
//             </button>
//           </>
//         )}
//       </div>

//       {/* عرض الرسالة المستلمة من الخادم */}
//       <p style={{ marginTop: "20px" }}>{message}</p>
//     </div>
//   );
// }

// export default Home;




import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // دالة لتسجيل مستخدم جديد
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2700/register",
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setAuthenticated(true);
    } catch (error) {
      setMessage("Registration Error: " + (error.response?.data?.message || error.message));
    }
  };

  // دالة لتسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2700/login",
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setAuthenticated(true);
    } catch (error) {
      setMessage("Login Error: " + (error.response?.data?.message || error.message));
    }
  };

  // دالة للوصول إلى صفحة الملف الشخصي المحمية
  const handleProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2700/profile",
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Profile Error: " + (error.response?.data?.message || error.message));
    }
  };

  // دالة لتسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:2700/logout", {}, { withCredentials: true });
      setMessage("Logged out successfully");
      setAuthenticated(false);
    } catch (error) {
      setMessage("Logout Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>JWT Authentication Demo</h2>
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
      <div>
        <button onClick={handleRegister} style={{ margin: "5px" }}>
          Register
        </button>
        <button onClick={handleLogin} style={{ margin: "5px" }}>
          Login
        </button>
        {authenticated && (
          <>
            <button onClick={handleProfile} style={{ margin: "5px" }}>
              Profile
            </button>
            <button onClick={handleLogout} style={{ margin: "5px" }}>
              Logout
            </button>
          </>
        )}
      </div>
      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default App;

