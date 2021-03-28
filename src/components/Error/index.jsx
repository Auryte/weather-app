import React, { Component } from 'react';
import styles from './styles.module.css'

export default class Error extends Component {
    render() {
        return (
            <div className={styles.Error}>
               <h5> <i className="fas fa-frown-open " ></i> Sorry, the specified city was not found.. </h5>
               
            </div>
        )
    }
}
