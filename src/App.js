import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/Wishlist";

const App = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const token = useSelector((state) => state.user?.token);
  // console.log(token)
  // console.log(user)
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product></Product>} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/profile/:userId" element={<Profile></Profile>} />
          <Route path="/mylist" element={<Wishlist></Wishlist>}></Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
