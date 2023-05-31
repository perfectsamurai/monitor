import React from 'react';

function Categories({ value = 0, onClickCategory }) {


    const categories = ['Все','С ошибкой','В работе','Исправленные'];



    return (
        <div className="content__top">
            <div className="categories">
                <ul>
                    {
                        categories.map((categoryName, i) => (
                            <li 
                                key={i} 
                                onClick={() => onClickCategory(i)}
                                className={value === i ? 'active' : ' '}>
                                {categoryName}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
  }
  
export default Categories;