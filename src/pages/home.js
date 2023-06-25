import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { getProducts, removeAllProducts } from "../redux/cartRedux";
import { useDispatch, useSelector } from 'react-redux'




const Home = () => {

  return (
    <div>
      
        <Navbar/>
        <Announcement></Announcement>
        <Slider></Slider>
        <Categories />
        <Products></Products>
        <Newsletter />
        <Footer/>
    </div>
  )
}

export default Home