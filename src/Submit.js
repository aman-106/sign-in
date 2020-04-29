import React from "react";

const emptyFn = () => { };
export default function Submit({ btnClsx, handleLogin }) {
  return (
    <button className={btnClsx} onClick={btnClsx === 'disabled' ? emptyFn : handleLogin}>
      Sign In
  </button>
  )
}