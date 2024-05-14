import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/auth/login", data)
      .then((response) => {
        login(response.data);
        toast.success("Login successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Failed to login");
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Login</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
