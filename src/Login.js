import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";
import { useEffect, useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });

    return () => {
      registerBtn.removeEventListener("click", () => {
        container.classList.add("active");
      });

      loginBtn.removeEventListener("click", () => {
        container.classList.remove("active");
      });
    };
  }, []);

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

  const handleSignUp = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:8080/auth/users", data)
      .then((response) => {
        toast.success("Account created successfully");
        document.getElementById("login").click();
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        toast.error("Failed to create account");
      });
  };

  return (
    // <div>
    //   <div className="container mt-4">
    //     <h1 className="text-center mb-4">Login</h1>
    //     <div className="row">
    //       <div className="col-md-6 offset-md-3">
    //         <form onSubmit={handleLogin}>
    //           <div className="form-group">
    //             <label htmlFor="username">Username</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="username"
    //               placeholder="Enter username"
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               id="password"
    //               placeholder="Password"
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //           </div>
    //           <button type="submit" className="btn btn-primary">
    //             Login
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="custom-body">
      {" "}
      {/* Apply custom-body class here */}
      <div className="custom-container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i class="bi bi-google"></i>
              </a>
              <a href="#" className="icon">
                <i class="bi bi-facebook"></i>{" "}
              </a>
              <a href="#" className="icon">
                <i class="bi bi-github"></i>{" "}
              </a>
              <a href="#" className="icon">
                <i class="bi bi-linkedin"></i>{" "}
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i class="bi bi-google"></i>{" "}
              </a>
              <a href="#" className="icon">
                <i class="bi bi-facebook"></i>{" "}
              </a>
              <a href="#" className="icon">
                <i class="bi bi-github"></i>{" "}
              </a>
              <a href="#" className="icon">
                <i class="bi bi-linkedin"></i>{" "}
              </a>
            </div>
            <span>or use your username password</span>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="hidden" id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all site features
              </p>
              <button className="hidden" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
