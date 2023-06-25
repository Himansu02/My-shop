import React from "react";
import styles from "./Announcement.module.css";

const Announcement=()=>{
    return <div className={styles.container}> 
        <marquee> Super deal free shipping on orders Over $50</marquee>
    </div>
}

export default Announcement;