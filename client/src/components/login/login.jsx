import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [personId, setpersonId ] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });

      setToken(response.data.token);
      setpersonId(response.data.personId);

    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Username or password incorrect");
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem('personId', personId);
      window.location.reload();
    } 
  }, [token]);

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="p-error">{error}</div>}
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button label="Login" onClick={handleLogin} className="p-col" />
        <Button
          label="Sign Up"
          className="p-button-info p-col"
          onClick={handleSignupRedirect}
        />
      </div>
    </div>
  );
};

export default Login;