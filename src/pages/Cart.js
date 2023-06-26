import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { color } from "@mui/system";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { removeProduct, updateQuantity } from "../redux/cartRedux";
import { loginSuccess } from "../redux/loginRedux";
import Popup from "../components/Popup";
import { Alert } from "@mui/material";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const quantityHandler = async (type, index, quantity) => {
    let currentProducts = cart.products;

    if (quantity === 1 && type === "dec") {
      return;
    }

    if (type === "dec") {
      quantity = quantity - 1;
    } else if (type === "inc") {
      quantity = quantity + 1;
    }

    let localObject = { ...currentProducts[index] };
    localObject = { ...localObject, quantity: quantity };
    let updatedProducts = currentProducts.filter((item, idx) => idx != index);
    updatedProducts = [...updatedProducts, localObject];

    dispatch(updateQuantity({ quantity, index, type }));
    const res = await axios.put(
      `https://my-shop-rest-api.vercel.app/users/${user?._id}`,
      {
        cart: updatedProducts,
      },
      { headers: { token: `Bearer ${userToken}` } }
    );
    dispatch(loginSuccess(res.data));
  };

  const handlePayment = async () => {
    try {
      if (cart.products.length === 0) {
        setError(true);
        setMessage("Add some Products to the Cart for Checkout !");
        return;
      }

      if (!userToken) {
        setError(true);
        setMessage("Please Login to continue !");
        return;
      }

      const {
        data: { order },
      } = await axios.post(
        "https://my-shop-rest-api.vercel.app/checkout/payment",
        {
          amount: cart.total,
        },
        { headers: { token: `Bearer ${userToken}` } }
      );

      let orderDetails = {
        userId: user._id,
        products: cart.products,
        amount: order.amount,
        address: { city: "Nabrangpur", post: 1234 },
        status: "success",
      };

      const options = {
        key: "rzp_test_JzuP099aUPzY8e",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: "Online Payment",
        image:
          "https://th.bing.com/th/id/OIP.bwH3Ezg-RhkHDRivMyLokAHaGy?w=193&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        order_id: order.id,
        handler: async function (response) {
          setSuccess(true);
          setOrderId(response.razorpay_order_id);
          orderDetails = {
            ...orderDetails,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          const res = await axios.post(
            "https://my-shop-rest-api.vercel.app/order",
            orderDetails,
            {
              headers: { token: `Bearer ${userToken}` },
            }
          );
          console.log(res.data);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "+917894942891",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      razor.open();
      console.log(razor);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleError = () => {
    setError(false);
    setMessage("");
  };

  const handleDelete = async (id, price, size, color) => {
    try {
      dispatch(removeProduct({ id, size, color, price }));
      const idx = user?.cart.findIndex((item) => {
        return item._id === id && item.size === size && item.color === color;
      });
      const newCart = user?.cart.filter((item, index) => {
        return index != idx;
      });
      const res = await axios.put(
        `https://my-shop-rest-api.vercel.app/users/${user?._id}`,
        {
          cart: newCart,
        },
        { headers: { token: `Bearer ${userToken}` } }
      );
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setOrderId("");
  };

  // console.log(cart);

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      {!success && <Announcement></Announcement>}
      {error && (
        <div className={styles.popup}>
          <Popup ok={handleError} message={message}></Popup>
        </div>
      )}
      {success && (
        <div className={styles.successContainer} onClick={handleClose}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ backgroundColor: "green", margin: "0px", padding: "0px" }}
          >
            <span className={styles.span}>SUCCESSFULL</span>
          </Alert>
          <p className={styles.orderParagraph}>Order Has Been Received.</p>
          <p className={styles.orderParagraph}>Order ID : {orderId}</p>
        </div>
      )}

      <div className={styles.wrapper}>
        <h1 className={styles.title}>YOUR BAG</h1>
        <div className={styles.topContainer}>
          <Link to="/" className={styles.link}>
            <button
              className={styles.topButton}
              style={{ backgroundColor: "transparent" }}
            >
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
        <div className={styles.buttomContainer}>
          <div className={styles.info}>
            {cart.products?.map((product, index) => {
              return (
                <div key={index}>
                  <div className={styles.product}>
                    <div className={styles.productDetails}>
                      <img className={styles.productImage} src={product.img} />
                      <div className={styles.details}>
                        <span className={styles.productName}>
                          <b>Product:</b> {product.title}
                        </span>
                        {/* <span className={styles.productId}>
                          <b>ID:</b> {product._id}
                        </span> */}
                        <div
                          className={styles.productColor}
                          style={{ backgroundColor: `${product.color}` }}
                        ></div>
                        <span className={styles.productSize}>
                          <b>Size:</b> {product.size}
                        </span>
                      </div>
                    </div>
                    <div className={styles.priceDetails}>
                      <div className={styles.productAmountContainer}>
                        <Add
                          onClick={() =>
                            quantityHandler("inc", index, product.quantity)
                          }
                        />
                        <div className={styles.productAmount}>
                          {product.quantity}
                        </div>
                        <Remove
                          onClick={() =>
                            quantityHandler("dec", index, product.quantity)
                          }
                        />
                      </div>
                      <div className={styles.productPrice}>
                        $ {product.price * product.quantity}
                      </div>
                      <div className={styles.deleteContainer}>
                        <DeleteOutline
                          className={styles.delete}
                          onClick={() =>
                            handleDelete(
                              product._id,
                              product.price * product.quantity,
                              product.size,
                              product.color
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <hr className={styles.horizontalLine} />
                </div>
              );
            })}
            {cart.products.length === 0 && (
              <div className={styles.noItem}>
                <p>No Items in the Cart!</p>
              </div>
            )}
          </div>
          <div className={styles.summary}>
            <h1 className={styles.summaryTitle}>ORDER SUMMARY</h1>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>SubTotal</span>
              <span className={styles.summaryItemPrice}>$ {cart.total}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>Estimate Shipping</span>
              <span className={styles.summaryItemPrice}>$ 5.90</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>Shipping Discount</span>
              <span className={styles.summaryItemPrice}>$ -5.90</span>
            </div>
            <div
              className={styles.summaryItem}
              style={{ fontSize: "24px", fontWeight: "500" }}
            >
              <span className={styles.summaryItemText}>Total</span>
              <span className={styles.summaryItemPrice}>$ {cart.total}</span>
            </div>

            <button className={styles.summaryButton} onClick={handlePayment}>
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
