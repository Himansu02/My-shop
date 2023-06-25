import { getToken, loginFailure, loginStart, loginSuccess } from "./loginRedux";
import axios from "axios";
import { getProducts, removeAllProducts } from "../redux/cartRedux";
import { userRequest } from "./requestMethods";
import { useSelector } from "react-redux";
import { getList } from "./listRedux";

export const login = async (dispatch, user) => {
  try {
    dispatch(loginStart());
    const res = await axios.post(
      "https://my-shop-rest-api.vercel.app/auth/login",
      user
    );
    console.log(res.data.accessToken);
    dispatch(getToken(res.data.accessToken));
    const cartItems = res.data?.cart;
    const listItems = res.data?.list;
    const listQuantity = listItems.length;
    let totalAmount = 0;
    let quantity = cartItems.length;
    for (let i = 0; i < quantity; i++) {
      totalAmount += cartItems[i].quantity * cartItems[i].price;
    }
    // console.log({products:cartItems,totalAmount,quantity})
    dispatch(loginSuccess(res.data));
    dispatch(getList({ products: listItems, quantity: listQuantity }));
    dispatch(getProducts({ products: cartItems, totalAmount, quantity }));
    // console.log(res.data.accessToken)
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const UpdateUser = async (id, userToken, user, dispatch) => {
  try {
    console.log(id);
    const res = await axios.put(
      `https://my-shop-rest-api.vercel.app/users/${id}`,
      user,
      { headers: { token: `Bearer ${userToken}` } }
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};
