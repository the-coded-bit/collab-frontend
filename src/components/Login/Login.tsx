import React, {  useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts";

const Login: React.FC<{}> = () => {
  const [Username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login,user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = () => {
    login({
      username: Username,
      password: password,
    });
    navigate('/')
  };

  if(user) navigate('/')

  return (
    <main className="login-container">
      <section className="login-group">
        <p className="login-title">Login</p>
        <span className="login-title-footer">to get started</span>
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            className="login-form-element"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-form-element"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Continue</button>
        </div>
        <div className="new-user">
          New User?{" "}
          <span
            className="register-user"
            onClick={(e) => navigate("/auth/signup")}
          >
            Register
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
