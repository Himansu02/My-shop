import {
  Facebook,
  Instagram,
  MailOutlined,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {

  const user=useSelector((state)=>state.user.currentUser)


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.logo}>My Shop</h1>
        <p className={styles.desc}>
          Description about all the things you want is present here.
        </p>
        <div className={styles.socialIcons}>
          <div
            className={styles.socialIcon}
            style={{ backgroundColor: "#3B5999" }}
          >
            <Facebook />
          </div>
          <div
            className={styles.socialIcon}
            style={{ backgroundColor: "#E4405F" }}
          >
            <Instagram />
          </div>
          <div
            className={styles.socialIcon}
            style={{ backgroundColor: "#55ACEE" }}
          >
            <Twitter />
          </div>
          <div
            className={styles.socialIcon}
            style={{ backgroundColor: "#E60023" }}
          >
            <Pinterest />
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <h3 className={styles.titleCenter}>Useful Links</h3>
        <ul className={styles.list}>
          <Link to="/" className={styles.link}>
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link to="/cart" className={styles.link}>
            <li className={styles.listItem}>Cart</li>
          </Link>
          <Link to="/products/men" className={styles.link}>
            <li className={styles.listItem}>Man Fashion</li>
          </Link>
          <Link to="/products/women" className={styles.link}>
            <li className={styles.listItem}>Woman Fashion</li>
          </Link>
          <Link to={`/profile/${user?._id}`} className={styles.link}>
            <li className={styles.listItem}>My Account</li>
          </Link>
          <Link to="/products/shoes" className={styles.link}>
            <li className={styles.listItem}>Shoes</li>
          </Link>
          <Link to="/products/watches" className={styles.link}>
            <li className={styles.listItem}>Watches</li>
          </Link>
          <Link to="/products/bag" className={styles.link}>
            <li className={styles.listItem}>Bags</li>
          </Link>
        </ul>
      </div>
      <div className={styles.right}>
        <h3 className={styles.titleRight}>Contact</h3>
        <div className={styles.contactItem}>
          <Room className={styles.symbols} /> 24,South Delhi,East
        </div>
        <div className={styles.contactItem}>
          <Phone  className={styles.symbols} /> +917847289392
        </div>
        <div className={styles.contactItem}>
          <MailOutlined  className={styles.symbols} /> xyz@gmail.com
        </div>
        <img
          className={styles.image}
          src="https://i.ibb.co/Qfvn4z6/payment.png"
        ></img>
      </div>
    </div>
  );
};

export default Footer;
