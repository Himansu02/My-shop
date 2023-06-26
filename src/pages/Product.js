import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  addProduct,
  increaseQualtityOfExisitingItem,
} from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
// import userRedux from "../../../admin/src/redux/userRedux";
import { loginSuccess } from "../redux/loginRedux";
import Popup from "../components/Popup";

const Product = () => {
  const id = useParams().id;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.token);
  const currentCartItems = useSelector((state) => state.cart.products);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const quantityHandler = (type) => {
    if (type === "dec") {
      if (quantity === 1) {
        return;
      }
      setQuantity((prev) => prev - 1);
    } else if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://my-shop-rest-api.vercel.app/products/find/${id}`
        );
        // res.data.color.map((c) => console.log(c));
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  const getData = async () => {
    try {
      // console.log("working")

      if (!userToken) {
        setError(true);
        setMessage("Please Login to add items to the cart !");
        return;
      }

      const add = currentCartItems.some(
        (item) => item._id === id && item.size === size && item.color === color
      );

      if (!add) {
        dispatch(addProduct({ ...product, quantity, color, size }));
        // console.log({...product,quantity,color,size}
        const newProduct = { ...product, quantity, color, size };
        const newCart = [...user?.cart, newProduct];
        // newCart.push(newProduct)
        console.log(userToken);
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
        setError(true);
        setMessage("The item is already in the cart !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = () => {
    setError(false);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <Announcement />
      {error && (
        <div className={styles.popup}>
          <Popup ok={handleError} message={message}></Popup>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={product.img} className={styles.image}></img>
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.desc}</p>
          <span className={styles.price}>{`$ ${product.price}`}</span>
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Color</span>
              {product.color?.map((c) => {
                return (
                  <div
                    className={styles.filterColor}
                    key={c}
                    style={{ backgroundColor: `${c}` }}
                    onClick={() => {
                      setColor(c);
                    }}
                  ></div>
                );
              })}
            </div>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Size</span>
              <select
                className={styles.filterSize}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {product.size?.map((s) => {
                  return (
                    <option key={s} className={styles.filterOption}>
                      {s}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.addContainer}>
            <div className={styles.amountContainer}>
              <Remove
                onClick={() => {
                  quantityHandler("dec");
                }}
              />
              <span className={styles.amount}>{quantity}</span>
              <Add
                onClick={() => {
                  quantityHandler("inc");
                }}
              />
            </div>
            <button className={styles.button} onClick={getData}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
