import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import "./formsignup.css";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setNameError("");
        setUsernameError("");
        setPasswordError("");
        setError("");

        let hasError = false;
        if (!name) {
            setNameError("Name is required");
            hasError = true;
        }
        if (!username) {
            setUsernameError("Username is required");
            hasError = true;
        }
        if (!password) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/registerUser", {
                name,
                username,
                password
            });
            navigate("/");  
        } catch (error) {
            console.error("Signup failed:", error.message);
            setError("Error al registrar el usuario");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Sign Up</h2>
                {error && <div className="p-error">{error}</div>}
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <div className="p-error">{nameError}</div>}
                </div>
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <div className="p-error">{usernameError}</div>}
                </div>
                <div className="p-field">
                    <label htmlFor="password">Password</label>
                    <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <div className="p-error">{passwordError}</div>}
                </div>
                <Button label="Sign Up" onClick={handleSignup} className="p-col" />
            </div>
        </div>
    );
};

export default RegisterForm;

