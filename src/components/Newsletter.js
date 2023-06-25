import { Send } from '@mui/icons-material';
import React from 'react'
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Newsletter</h1>
        <div className={styles.desc}> Get the Daily News and Updates from here!</div>
        <div className={styles.inputContainer}>
            <input className={styles.input} placeholder="Your email"></input>
            <button className={styles.button}>
                <Send></Send>
            </button>
        </div>
    </div>
  )
}

export default Newsletter