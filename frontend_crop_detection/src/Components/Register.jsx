import React, { useState } from "react";
// import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import API from "../api";
import LoadingIndicator from "./LoadingIndicator";
import '../Styles/login_register.css'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await API.post("/register/", { username, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed", error);
      setUsername("")
      setPassword("")
    }finally {
      setLoading(false)
  }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="off"
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Register
            </button>
            <br/>
            
        </form>
    </div>
  );
}

export default Register;