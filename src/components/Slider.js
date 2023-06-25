import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styles from "./Slider.module.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slideClickHandler = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 100 : 200);
    } else {
      setSlideIndex(slideIndex < 200 ? slideIndex + 100 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrow}
        style={{ left: "10px" }}
        onClick={() => slideClickHandler("left")}
      >
        <ArrowLeftOutlined></ArrowLeftOutlined>
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(-${slideIndex}vw)` }}
      >
        <div className={styles.slide} style={{ backgroundColor: "#fbf0f4" }}>
          <div className={styles.imageContainer}>
            <img
              src="https://th.bing.com/th/id/R.b61bfd56798c34e0fddaee990d7e1ab7?rik=2oj6la0L3ZKebw&riu=http%3a%2f%2fwww.koicosmetics.net%2fwp-content%2fuploads%2f2019%2f08%2fmol-768x768.png&ehk=9anjVYTQ8RzhKm2aSVr%2bL3b7MaaRuy%2bP0IpqF0fFrIM%3d&risl=&pid=ImgRaw&r=0"
              className={styles.image}
            ></img>
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>POUPULAR SALE</h1>
            <p className={styles.description}>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </p>
            <Link to="/products?new=true"  className={styles.link}>
              <button className={styles.button}>SHOP NOW</button>
            </Link>
          </div>
        </div>
        <div className={styles.slide} style={{ backgroundColor: "#F5FFFA" }}>
          <div className={styles.imageContainer}>
            <img
              src="https://freepngimg.com/thumb/girl/23163-2-woman-model-image.png"
              className={styles.winterImage}
            ></img>
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>MEGA SALE</h1>
            <p className={styles.description}>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </p>
            <Link to="/products?new=true"  className={styles.link}>
              <button className={styles.button}>SHOP NOW</button>
            </Link>
          </div>
        </div>
        <div className={styles.slide} style={{ backgroundColor: "#fcf1ed" }}>
          <div className={styles.imageContainer}>
            <img
              src="https://i.ibb.co/cXFnLLV/3.png"
              className={styles.image}
            ></img>
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>SUMMER SALE</h1>
            <p className={styles.description}>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </p>
            <Link to="/products?new=true" className={styles.link}>
              <button className={styles.button}>SHOP NOW</button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={styles.arrow}
        style={{ right: "10px" }}
        onClick={() => slideClickHandler("right")}
      >
        <ArrowRightOutlined></ArrowRightOutlined>
      </div>
    </div>
  );
};

export default Slider;
