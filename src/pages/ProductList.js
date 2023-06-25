import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import styles from "./ProductList.module.css";
import { useParams, useLocation } from "react-router-dom";

const ProductList = () => {
  const cat = useParams().category;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const newQuery=params.get("new");

  // console.log(search)
  const [filters, setFilter] = useState({});

  useEffect(() => {
    setFilter({});
  }, [search]);

  // console.log(search);

  const handleFilter = (e) => {
    setFilter({ ...filters, [e.target.name]: e.target.value });
  };
  // console.log(filters);

  const [sort, setSort] = useState("newest");

  const sortHanhler = (e) => {
    setSort(e.target.value);
  };
  // console.log(filters);
  return (
    <div className={styles.container}>
      <Navbar />
      <Announcement />
      <h1 className={styles.title}>{cat ? cat : "Products"}</h1>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <span className={styles.filterText}>Filter Products:</span>
          <select
            className={styles.select}
            name="color"
            onChange={handleFilter}
          >
            <option disabled>Color</option>
            <option>white</option>
            <option>black</option>
            <option>yellow</option>
            <option>blue</option>
            <option>red</option>
            <option>gray</option>
          </select>
          <select className={styles.select} name="size" onChange={handleFilter}>
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <select className={styles.select} name="size" onChange={handleFilter}>
            <option disabled>UK</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterText}>Sort Products:</span>
          <select className={styles.select} onChange={sortHanhler}>
            <option value="newest">Newest</option>
            <option value="asc">Price( asc )</option>
            <option value="desc">Price ( desc )</option>
          </select>
        </div>
      </div>
      <Products
        cat={cat}
        filters={filters}
        sort={sort}
        search={search}
        newQuery={newQuery}
      ></Products>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
