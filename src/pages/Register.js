import React, { useEffect } from "react";
import styles from "./Register.module.css";
import { useState } from "react";
import { publicRequest, userRequest } from "../redux/requestMethods";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  loginFailure,
  loginSuccess,
  logout,
} from "../redux/loginRedux";
import { getProducts } from "../redux/cartRedux";
import { getList } from "../redux/listRedux";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.token);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [userError, setUserError] = useState(false);
  const [notExist, setNotExist] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const handleclick = (e) => {
    e.preventDefault();

    const fullName = firstName.current.value + " " + lastName.current.value;

    if (password.current.value === confirmPassword.current.value) {

      const ok=username.current.value.trim().length>0 && 
               firstName.current.value.trim().length>0 &&
               lastName.current.value.trim().length>0 &&
               email.current.value.trim().length>0 &&
               password.current.value.trim().length>0 &&
               confirmPassword.current.value.trim().length>0 

      const addUser = async () => {
        const inputs = {
          fullname: fullName,
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
        };
        try {
          const res = await publicRequest.post("auth/register", inputs);
          // console.log(res.data)
          const cartItems = res.data?.cart;
          const listItems=res.data?.list
          const listQuantity=listItems.length
          let totalAmount = 0;
          let quantity = cartItems.length;
          for (let i = 0; i < quantity; i++) {
            totalAmount += cartItems[i].quantity * cartItems[i].price;
          }

          dispatch(getProducts({ products: cartItems, totalAmount, quantity }));
          dispatch(getList({products:listItems,quantity:listQuantity}))
          dispatch(loginSuccess(res.data));
          dispatch(getToken(res.data.accessToken));

   
        } catch (err) {
          setError(true);
          setMessage(err.message);
        }
      };

     ok && addUser();
     if(!ok){
        setError(true)
        setMessage("Please Fill all the Input Fields !")
     }

    } else {
      setError(true);
      setMessage("Password and Confirm Password Not Matching !");
    }
  };

  const handleChange = async (e) => {
    try {
      const val = e.target.value;

      if (val.trim().length <= 4) {
        setNotExist(false);
        setUserError(true);
        setUsernameErrorMessage("Enter more than 4 characters !");
        return;
      } else {
        setUserError(false);
        setUsernameErrorMessage("");
      }

      const res = await publicRequest.post("users/check", { username: val });
      if (res.data) {
        setNotExist(false);
        setUserError(true);
        setUsernameErrorMessage("The Username Already Exists !");
      } else {
        setUserError(false);
        setNotExist(true);
        setUsernameErrorMessage("");
      }
    } catch (err) {
      setError(true);
      setMessage("User Request Problem !");
    }
  };

  if (error) {
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 3000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
        <form className={styles.form}>
          <div className={styles.leftInputContainer}>
            <input
              className={styles.input}
              ref={firstName}
              placeholder="name"
            ></input>
            <input
              onChange={handleChange}
              className={styles.input}
              ref={username}
              placeholder="username"
            ></input>
            {userError && (
              <span className={styles.userError}>{usernameErrorMessage}</span>
            )}
            {notExist && (
              <span className={styles.notExist}>Can be Used as Username.</span>
            )}
            <input
              className={styles.input}
              ref={password}
              placeholder="password"
            ></input>
          </div>
          <div className={styles.rightInputContainer}>
            <input
              className={styles.input}
              ref={lastName}
              placeholder="last name"
            ></input>

            <input
              className={styles.input}
              ref={email}
              placeholder="email"
            ></input>
            <input
              className={styles.input}
              placeholder="confirm password"
              ref={confirmPassword}
            ></input>
          </div>
          <span className={styles.agreement}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button className={styles.button} onClick={handleclick}>
            CREATE
          </button>
        </form>
        {error && <p className={styles.error}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
