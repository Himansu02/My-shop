import React from "react";
import styles from "./Success.module.css";
import { CheckCircle } from "@mui/icons-material";
import { Alert } from "@mui/material";

const Success = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://th.bing.com/th/id/OIP.bwH3Ezg-RhkHDRivMyLokAHaGy?w=193&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        className={styles.img}
      />
      <Alert variant="filled" severity="success">
        This is a success alert — check it out!
      </Alert>
      <p>Your Order Has Been Received.</p>
      <p>Order ID : 1234345</p>
    </div>
  );
};

export default Success;
