import {
  Favorite,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../redux/listRedux";
import axios from "axios";
import { loginSuccess } from "../redux/loginRedux";
import Popup from "./Popup";
import { addProduct } from "../redux/cartRedux";

const Product = ({ item }) => {
  const [inList, setInList] = useState(false);

  const userList = useSelector((state) => state.list.products);
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    userList.some((product) => product._id === item._id)
      ? setInList(true)
      : setInList(false);
  }, [item]);

  const handleDeleteList = async () => {
    try {
      // console.log("working")

      if (!userToken) {
        return;
      }
      setInList(false);
      dispatch(removeFromList(item._id));
      // console.log({...product,quantity,color,size}

      const newList = user?.list.filter((product) => {
        return product._id != item._id;
      });
      const res = await axios.put(
        `https://my-shop-rest-api.vercel.app/users/${user?._id}`,
        {
          list: newList,
        },
        { headers: { token: `Bearer ${userToken}` } }
      );

      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddList = async () => {
    try {
      // console.log("working")

      if (!userToken) {
        return;
      }
      setInList(true);

      dispatch(addToList(item));
      // console.log({...product,quantity,color,size}
      const newList = [...userList, item];
      // newCart.push(newProduct)

      const res = await axios.put(
        `https://my-shop-rest-api.vercel.app/users/${user?._id}`,
        {
          list: newList,
        },
        { headers: { token: `Bearer ${userToken}` } }
      );

      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCart = async () => {
    try {
      // console.log("working")

      if (!userToken) {
        return;
      }

      const add = cart.some(
        (product) =>
          product._id === item._id &&
          product.size === item.size[0] &&
          product.color === item.color[0]
      );

      if (!add) {
        dispatch(
          addProduct({
            ...item,
            quantity: 1,
            color: item.color[0],
            size: item.size[0],
          })
        );
        // console.log({...product,quantity,color,size}
        const newProduct = {
          ...item,
          quantity: 1,
          color: item.color[0],
          size: item.size[0],
        };
        const newCart = [...cart, newProduct];
        // newCart.push(newProduct)
        const res = await axios.put(
          `https://my-shop-rest-api.vercel.app/users/${user?._id}`,
          {
            cart: newCart,
          },
          { headers: { token: `Bearer ${userToken}` } }
        );
        console.log(res.data);
        dispatch(loginSuccess(res.data));
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <img className={styles.image} src={item.img}></img>
      <div className={styles.info}>
        <div className={styles.icon} onClick={handleCart}>
          <ShoppingCartOutlined />
        </div>
        <div className={styles.icon}>
          <Link to={`/product/${item._id}`} className={styles.link}>
            <SearchOutlined  />
          </Link>
        </div>
        {!inList && (
          <div className={styles.icon} onClick={handleAddList}>
            <FavoriteBorderOutlined></FavoriteBorderOutlined>
          </div>
        )}
        {inList && (
          <div
            className={`${styles.icon} ${styles.heart}`}
            onClick={handleDeleteList}
          >
            <Favorite></Favorite>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
