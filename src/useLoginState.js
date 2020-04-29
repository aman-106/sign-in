import { useState, useCallback, useMemo } from "react";

export const emptyStr = "";

function eventHandler(fn) {
  return function (event) {
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
  const regex = /(?!.*[A-Z]{1}.*[A-Z]{1})(?=.*[A-Z]{1})(^.{6,}$)/;
  return regex.test(String(password));
  // return /(?=.*[A-Z])(.){6,}/.test(String(password));
}

export const authUserState = {
  none: "none",
  loading: "loading",
  fail: "fail",
  sucess: "sucess"
};

export function useLoginState() {
  const [user, setUser] = useState(emptyStr);
  const [password, setPassword] = useState(emptyStr);
  const [authState, setAuthState] = useState(authUserState.none);

  const handlePassword = useCallback(eventHandler(setPassword), [password]);
  const handleUser = useCallback(eventHandler(setUser), [user]);

  const validInputs = useMemo(
    function () {
      return {
        user: validateEmail(user),
        password: validatePassword(password)
      };
    },
    [user, password]
  );

  const handleLogin = useCallback(function () {
    setAuthState(authUserState.loading);
    fetch("http://www.mocky.io/v2/5d9d9219310000153650e30b")
      .then(() => {
        setAuthState(authUserState.sucess);
      })
      .catch(function () {
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