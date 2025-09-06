import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";
import API from "../api";
import '../Styles/login_register.css'
import { red } from "@mui/material/colors";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await API.post("/reset-password/", {
        username,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      setUsername("")
      setNewPassword("")
      window.location.href = '/login'
      // navigate('/login')
    } catch (error) {
      setMessage(error.response?.data?.error || "The provided username doesn't seem to exist!!");
      setUsername("")
      setNewPassword("")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div>
      {/* <h2 style={{textAlign: 'center', color: 'red'}}>Reset Password</h2> */}
      <form onSubmit={handleSubmit} className="form-container">
      <h1 style={{textAlign: 'center'}}>Reset Password</h1>
      {message && <p style={{color: 'red', fontSize: "16px", textAlign: 'center'}}>{message}</p>}
        <input
          type="text"
          className="form-input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* <br /> */}
        <input
          type="password"
          className="form-input"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {/* <br /> */}
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">Reset Password</button>
        <div>
          <p className="p2"><Link to="/login">Back to Login</Link></p>
        </div>
      </form>
      
    </div>
  );
};

export default ResetPassword;