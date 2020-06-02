import React, { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data: loginData }] = useMutation(LOGIN, {
    onError: ({ networkError }) => {
      if (networkError) {
        console.log("Add book mutation error:", networkError.result.errors);
      }
    },
  });

  useEffect(() => {
    if (loginData) {
      const token = loginData.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setPage("books");
      setUsername("");
      setPassword("");
    }
  }, [loginData]); // eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) return null;

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
