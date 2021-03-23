
import React from 'react'
import './styles.scss';


const Category = ({ totalCategory, onClickCategory }) => {

    return (
        <div className="category-section-content">
            {totalCategory?.map((category, i) => {
                return (
                    <div key={`${category}-${i}`} onClick={() => onClickCategory(category)} className="category-item">
                        <div className='content'>{category}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;