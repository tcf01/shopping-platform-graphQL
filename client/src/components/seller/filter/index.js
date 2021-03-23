
import React from 'react';
import './styles.scss'

const Filter = ({ handleFilterOnClick, buttons }) => {
    return (
        <div className="filter-section-wrapper">
            {buttons.map((button, i) => <div className={`filter-button ${button.isActive ? 'isActive' : ''}`} children={button.name} onClick={() => handleFilterOnClick(i)} />)}
        </div>
    )
}

export default Filter;