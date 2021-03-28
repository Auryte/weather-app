import React, { Component } from 'react';
import styles from './styles.module.css'
import { FaBeer } from 'react-icons/fa';

export default class SearchBar extends Component {

    render() {

        return (
            <div>
                <input required className={styles.SearchInput}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => {this.props.setValue(e.target.value)}} />
            </div>
        )
    }
}
