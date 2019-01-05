import React, { Component } from 'react';
import _ from "lodash";
import './_filters.sass';
import Rating from './rating';
import Category from './category';

function Filters (props) {
    let stars = [];
    props.products.map(product => {
        stars.push(product.rating);
    });
    stars = _.sortBy(_.uniq(stars));

    return (
        <div className="filters-wrapper">
            {/* Categories Filter*/}
            <Category categories={props.categories} filterByCategory={props.filterByCategory}/>

            {/* Rating Filters*/}
            <Rating stars={stars} filterByRating={props.filterByRating}/>
        </div>
    )
}

export default Filters;
