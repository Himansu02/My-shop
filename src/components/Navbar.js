import {
  FavoriteBorderOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/loginRedux";
import {
  getProducts,
  removeAllItems,
  removeAllProducts,
} from "../redux/cartRedux";
import { useState } from "react";
import { publicRequest } from "../redux/requestMethods";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { removeAllItemsFromList } from "../redux/listRedux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.token);

  const listQuantity = useSelector((state) => state.list.quantity);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllItems());
    dispatch(removeAllItemsFromList());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleSearch = async () => {

  //   if (query.trim().length > 0) {
  //     console.log("working")
  //     try {
  //       const res = await publicRequest.get(`products?search=${query}`);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <span className={styles.languages}>EN</span>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className={styles.searchContainer}
          placeholder="Search"
        ></input>
        {query ? (
          <Link to={`/products?search=${query}`} className={styles.link}>
            <Search></Search>
          </Link>
        ) : (
          <Search></Search>
        )}
      </div>
      <div className={styles.middle}>
        <Link to="/" className={styles.link}>
          <h1 className={styles.logo}>My Shop</h1>
        </Link>
      </div>
      <div className={styles.right}>
        {!user && (
          <Link to="/register" className={styles.link}>
            <span className={styles.menuItems}>REGISTER</span>
          </Link>
        )}
        {!user && (
          <Link to="/login" className={styles.link}>
            <span className={styles.menuItems}>SIGNIN</span>
          </Link>
        )}

        <Link
          to="/mylist"
          className={`${styles.link} ${styles.fav} ${!user && styles.notUser}`}
        >
          <Badge badgeContent={listQuantity} color="primary">
            <FavoriteBorderOutlined></FavoriteBorderOutlined>
          </Badge>
        </Link>
        <Link to="/cart" className={`${styles.link} ${styles.cart}`}>
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </Link>
        {user && (
          <div className={styles.imgContainer}>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img
                  className={styles.img}
                  src={
                    user.img
                      ? user.img
                      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt="profile-pic"
                />{" "}
              </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Link to={`/profile/${user._id}`} className={styles.link}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
