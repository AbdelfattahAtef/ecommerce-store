import React  from 'react';

function Sorts({filterByName, getProducts, sortBy}){
    return (
        <div className="sort">
            <input type="text"
                   className="sort__filter"
                   placeholder="Filter By Product Name"
                   onChange={filterByName}/>
            <div className="sort__buttons">
                <button
                    className="sort-buttons__refresh"
                    onClick={getProducts}
                >
                    Reset all filters
                    <i className="fa fa-refresh" />
                </button>
                <button
                    className="sort-buttons__priceLowest"
                    onClick={() => sortBy("priceLowest")}
                >
                    Price (Lowest First)
                </button>
                <button
                    className="sort-buttons__priceHighest"
                    onClick={() => sortBy("priceHighest")}
                >
                    Price (Highest First)
                </button>
            </div>
        </div>
    )
}

export default Sorts;
