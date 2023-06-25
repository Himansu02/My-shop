import React, { useEffect, useState } from "react";
import { popularProducts } from "../data";
import styles from "./Products.module.css";
import Product from "./Product";
import axios from "axios";

const Products = ({ cat, filters, sort, search, newQuery }) => {
  // console.log(filters)
  // console.log(search)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resData = await axios.get(
          cat
            ? `https://my-shop-rest-api.vercel.app/products?category=${cat}`
            : search?.trim().length > 0
            ? `https://my-shop-rest-api.vercel.app/products?search=${search}`
            : "https://my-shop-rest-api.vercel.app/products"
        );
        console.log(resData);
        setProducts(resData.data);
      } catch (err) {
        console.log(err);
      }
    };
    const newProducts = async () => {
      try {
        const res = await axios.get(
          `https://my-shop-rest-api.vercel.app/products?new=${newQuery}`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    !newQuery ? getProducts() : newProducts();
  }, [cat, search, newQuery]);

  useEffect(() => {
    (cat || search || newQuery) &&
      setFilteredProducts(
        products.filter((item) => {
          return Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          });
        })
      );
  }, [cat, search, filters, newQuery, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          return a.price - b.price;
        })
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          return b.price - a.price;
        })
      );
    }
  }, [sort]);

  return (
    <div>
      <div className={styles.container}>
        {cat || search || newQuery
          ? filteredProducts.map((item) => {
              return <Product item={item} key={item._id} />;
            })
          : products.slice(0, 8).map((item) => {
              return <Product item={item} key={item._id} />;
            })}
      </div>
      {cat || search || newQuery
        ? filteredProducts.length === 0 && (
            <div className={styles.para}>
              <p>No Products Found.</p>
            </div>
          )
        : products.length === 0 && (
            <div className={styles.para}>
              <p>No Products Found.</p>
            </div>
          )}
    </div>
  );
};

export default Products;
