import React, { Component } from 'react';
import './_cards.sass';
import _ from "lodash";
import $ from "jquery";
import Loader from "../loader";
import Sorts from "./sorts"
class Cards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: props.products,
            allProducts: props.products,
            showLoader: false,
            numOfProducts: 10,
        };
        this.filterByName = this.filterByName.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        $(window).on("scroll", () => {
            if ($(window).scrollTop() + $(window).height() === $(document).height()) {
                this.setState(prevState => ({
                    showLoader: !prevState.showLoader
                }));
                this.loadMoreProducts();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products,
            allProducts: nextProps.products,
        });
    }

    /**
     * Load More Products
     */
    loadMoreProducts() {
        if(this.state.products.length === 0){
            this.setState({
                showLoader: false,
            });
        }else{
            setTimeout(() => {
                this.setState(prevState => ({
                    showLoader: !prevState.showLoader,
                    numOfProducts: prevState.numOfProducts + 10
                }));
            }, 500);
        }
    }

    /**
     * Sort Products
     * @param sortBy
     */
    sortBy(sortBy) {
        switch (sortBy) {
            case "priceLowest":
                setTimeout(() => {
                    this.setState(prevState => ({
                        showLoader: !prevState.showLoader,
                    }));
                }, 500);
                this.setState(prevState => ({
                    products: _.sortBy(this.state.products, "price"),
                    showLoader: !prevState.showLoader,
                }));
                break;
            case "priceHighest":
                setTimeout(() => {
                    this.setState(prevState => ({
                        showLoader: !prevState.showLoader,
                    }));
                }, 500);
                this.setState(prevState => ({
                    products: _.sortBy(this.state.products, "price").reverse(),
                    showLoader: !prevState.showLoader,
                }));
                break;
        }
    }

    /**
     * Filter By Name
     */
    filterByName(e) {
        const name = e.target.value;
        if(name){
            this.setState({
                products: this.state.products.length > 0 ?
                    this.state.products.filter(product => (
                        product.name.toLowerCase().includes(name.toLowerCase())
                    )) :
                    this.state.allProducts.filter(product => (
                        product.name.toLowerCase().includes(name.toLowerCase())
                    ))
            });
        }else{
            this.setState({
                products: this.state.allProducts
            })
        }
    }

    render () {
        const {products} = this.state;
        return (
            <React.Fragment>
                {/*Sorts Component*/}
                <Sorts filterByName={this.filterByName}
                       getProducts={this.props.getProducts}
                       sortBy={this.sortBy}/>

                {/*List all Cards*/}
                <div className="cards-wrapper">
                    <React.Fragment>
                        {
                            products &&
                            products.length > 0 &&
                            _.range(this.state.numOfProducts).map(productIndex => (
                                products[productIndex] &&
                                <div className="cards-wrapper__item"
                                     style={
                                         {
                                             backgroundColor: _.includes(products[productIndex].color.toLowerCase(), ' ')
                                                 ? products[productIndex].color.toLowerCase().replace(' ', '')
                                                 : products[productIndex].color.toLowerCase(),
                                             color: products[productIndex].color.toLowerCase() === 'mint green' || products[productIndex].color.toLowerCase() === 'white'
                                                 ? '#05abda'
                                                 : '#fff'
                                         }
                                     }
                                     key={products[productIndex].name + products[productIndex].id}>
                                    <div className="cards-wrapper__item-name">
                                        {products[productIndex].name}
                                    </div>
                                    <div className="cards-wrapper__item-color">
                                        {products[productIndex].color.toUpperCase()}
                                    </div>
                                    <img className="cards-wrapper__item-image"
                                         src={products[productIndex].image}/>
                                    <div className="cards-wrapper__item-price">
                                        {products[productIndex].price} {products[productIndex].currency === 'USD' ? '$' : products[productIndex].currency}
                                    </div>
                                    <div className="cards-wrapper__item-rate">
                                        {
                                            _.range(products[productIndex].rating).map((rate, index) => (
                                                <img width="30px"
                                                     height="30px"
                                                     src="http://www.pngmart.com/files/7/Rate-Us-PNG-Clipart.png"
                                                     alt=""
                                                     key={`rate-star-${index}`}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }

                        {/*Display Message if there are no products*/}
                        {
                            products.length === 0 &&
                                <div className="cards-wrapper__no-available-data">
                                    There is no data available now please recheck later
                                </div>
                        }

                        {/*Toggle Display of Loader*/}
                        {this.state.showLoader && <Loader />}
                    </React.Fragment>
                </div>
            </React.Fragment>
        );

    }
}

export default Cards;
