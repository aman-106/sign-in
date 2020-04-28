import React, { useState, useCallback, useMemo } from "react";
import "./styles.css";

function Input(props) {
  const { error } = props;
  const clsx = error ? "input-wrapper error" : "input-wrapper";

  return (
    <span className={clsx}>
      <input {...props} />
    </span>
  );
}
const emptyStr = "";

function eventHandler(fn) {
  return function(event) {
    const { value } = event.target;
    fn(value);
  };
}

function validateEmail(email) {
  // checks email pattern and min letters c@d.co
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return true;
}

const authUserState = {
  none: "none",
  loading: "loading",
  fail: "fail",
  sucess: "sucess"
};

function useLoginState() {
  const [user, setUser] = useState(emptyStr);
  const [password, setPassword] = useState(emptyStr);
  const [authState, setAuthState] = useState(authUserState.none);

  const handlePassword = useCallback(eventHandler(setPassword), [password]);
  const handleUser = useCallback(eventHandler(setUser), [user]);

  const validInputs = useMemo(
    function() {
      return {
        user: validateEmail(user),
        password: validatePassword(password)
      };
    },
    [user, password]
  );

  const handleLogin = useCallback(function() {
    setAuthState(authUserState.loading);
    fetch("http://www.mocky.io/v2/5d9d9219310000153650e30b")
      .then(() => {
        setAuthState(authUserState.sucess);
      })
      .catch(function() {
        setAuthState(authUserState.fail);
      });
  }, []);

  return [
    user,
    password,
    handleUser,
    handlePassword,
    validInputs,
    authState,
    handleLogin
  ];
}

function Login(props) {
  const [
    user,
    password,
    handleUser,
    handlePassword,
    validInputs,
    authState,
    handleLogin
  ] = useLoginState();
  const btnClsx = validInputs.user && validInputs.password ? "" : "disabled";
  return (
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <span className="subheader">Use your HealthifyMe Account</span>
        <Input
          error={!validInputs.user}
          type="email"
          placeholder="Email"
          value={user}
          onChange={handleUser}
        />
        <Input
          error={!validInputs.password}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button className={btnClsx} onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}
