import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Contexts";

const Signup: React.FC<{}> = () => {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Username, setUsername] = useState<string>("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async () => {
    signup({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      username: Username
    })
    navigate('/');
  };

  return (
    <main className="login-container">
      <section className="login-group">
        <p className="login-title">Signup</p>
        <span className="login-title-footer">to get started</span>
        <div className="login-form">
          <input
            type="text"
            placeholder="first name"
            className="login-form-element"
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            className="login-form-element"
            onChange={(e) => setLast_name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="login-form-element"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="login-form-element"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-form-element"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleSubmit()}>Continue</button>
        </div>
        <div className="new-user">
          Already registered? <span className="register-user" onClick={() => navigate('/auth/login')}>Login</span>
        </div>
      </section>
    </main>
  );
};

export default Signup;
