import React from 'react'
import styles from './CategoryItem.module.css'
import {  Link } from 'react-router-dom';

 const CategoryItem = ({item}) => {
  return (
    <div className={styles.container}>
      <Link to={`/products/${item.cat}`}>
        <img src={item.img} className={styles.image}></img>
        <div className={styles.info}>
            <h1 className={styles.title}>{item.title}</h1>
            <button className={styles.button}>SHOP NOW</button>
        </div>
        </Link>
    </div>
  )
}

export default CategoryItem;
