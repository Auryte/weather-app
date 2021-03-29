import React, { Component } from 'react';
import styles from './styles.module.css';
// import { FaBeer } from 'react-icons/fa';
import { CgSearch } from "react-icons/cg";

export default class SearchBar extends Component {

    render() {

        return (
            <div className={styles.SearchBar}>
                <CgSearch
                className={styles.Icon}
                />
                <input required className={styles.SearchInput}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={(e) => {this.props.setValue(e.target.value)}} />
            </div>
        )
    }
}
