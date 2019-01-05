import React  from 'react';
import _ from "lodash";

function Rating({stars, filterByRating}) {
    return (
        stars &&
        stars.length > 0 &&
        <React.Fragment>
            <div className="filters-wrapper__title">Filter By Rates</div>
            <ul className="filters-wrapper__list">
                {
                    stars.map(star => (
                        <li
                            className="filters-wrapper__list-item filters-wrapper__list-item--stars"
                            onClick={() => filterByRating(star)}
                            key={star}
                        >
                            {
                                _.range(star).map((starImg, index) => (
                                    <img src="http://www.pngmart.com/files/7/Rate-Us-PNG-Clipart.png"
                                         alt=""
                                         width="30px"
                                         height="30px"
                                         key={`rate-star${index}`}
                                    />
                                ))
                            }
                        </li>
                    ))
                }
            </ul>
        </React.Fragment>
    )
}
export default Rating;
