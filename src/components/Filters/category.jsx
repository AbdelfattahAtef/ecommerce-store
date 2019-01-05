import React  from 'react';

function Category({categories, filterByCategory}) {
    return (
        categories &&
        categories.length > 0 &&
        <React.Fragment>
            <div className="filters-wrapper__title">Filter By Categories</div>
            <li className="filters-wrapper__list-item"
                onClick={
                    () => filterByCategory(undefined)
                }>
                <span>All Categories</span>
            </li>
            <ul className="filters-wrapper__list">
                {
                    categories.map(category => (
                        <li className="filters-wrapper__list-item"
                            key={category.name}
                            onClick={
                                () => filterByCategory(category.id)
                            }
                        >
                            <span>{category.name}</span>
                            <img src={category.image}
                                 alt={category.name}/>
                        </li>
                    ))
                }
            </ul>
        </React.Fragment>
    )
}

export default Category;
