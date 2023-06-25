import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import styles from "./Wishlist.module.css";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Wishlist = () => {
  const id = useParams().userId;
  const list = useSelector((state) => state.list.products);

  return (
    <div>
      <Navbar />
      <Announcement />
      <div>
        <div className={styles.titleContainer}>
          <h1>Wishlist</h1>
        </div>
        <div className={styles.container}>
          {list?.map((item, index) => {
            return <Product item={item} key={index}></Product>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
