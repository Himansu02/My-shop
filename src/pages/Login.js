import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./Login.module.css";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, logout } from "../redux/loginRedux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const dispatch = useDispatch();
  const { isFetching, isError, currentUser } = useSelector(
    (state) => state.user
  );
  
  useEffect(()=>{
    dispatch(logout())
  },[])

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    // console.log(currentUser)
  };

  if(isError)
  {
    setTimeout(() => {
      dispatch(clearError())
    }, 3000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SIGN IN</h1>
        <form className={styles.form}>
          <input
            className={styles.input}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
          ></input>
          <input
            className={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          ></input>
          {isError && (
            <span className={styles.error}>Please Enter Correct Inputs !</span>
          )}
          <button
            className={styles.button}
            disabled={isFetching}
            onClick={submitHandler}
          >
            LOG IN
          </button>

          <span className={styles.link}>DO NOT REMEMBER THE PASSWORD?</span>
          <Link to="/register" className={styles.link}>
            <span >CREATE A NEW ACCOUNT</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
