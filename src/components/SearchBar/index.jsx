import React, { Component } from 'react';
import styles from './styles.module.css'

export default class SearchBar extends Component {

    render() {

        return (
            <div>
                <input required className={styles.SearchInput}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={(e) => {
                        this.props.setValue(e.target.value)
                     
                    }} />
            </div>
        )
    }
}
