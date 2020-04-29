import React, { useState, useCallback, useMemo } from "react";
import { useLoginState, authUserState } from './useLoginState';
import Input from './Input';
import Submit from './Submit';
import "./styles.css";


export function Login(props) {
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
    <div className="form-container sign-in-container">
      {authState === authUserState.sucess ? (
        <h2 className="home-page">Home Page</h2>
      ) : (
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
            <div className={authState === authUserState.loading ? 'loading' : 'non-loading'}>
              <Submit btnClsx={btnClsx} handleLogin={handleLogin} />
              <div className="loader"></div>
            </div>
          </form>
        )
      }

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
