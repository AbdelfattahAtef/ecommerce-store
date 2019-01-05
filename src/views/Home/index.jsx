import React, { Component } from 'react';
import './_home.sass';
import axios from "axios";
import _ from "lodash";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import Cards from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Loader from "../../components/loader";
class Home extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            products: [],
            filteredProducts: [],
            showLoader: false,
            toggleSidebar: false,
            categoryId: undefined,
            rating: undefined,
        };
        this.filterByCategory = this.filterByCategory.bind(this);
        this.filterByRating = this.filterByRating.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    /**
     * Get All Categories
     */
    getCategories = () => {
        this.setState({ showLoader: true });
        axios
            .get('http://test-api.edfa3ly.io/category')
            .then(res => {
                this.setState({
                    categories: res.data,
                    showLoader: false,
                });
            })
            .catch(error => {
                console.log("Error fetching and parsing data", error);
            });
    };

    /**
     * Get All Products
     */
    getProducts = () => {
        this.setState({ showLoader: true });
        axios
            .get('http://test-api.edfa3ly.io/product')
            .then(res => {
                this.setState({
                    products: res.data,
                    filteredProducts: res.data,
                    showLoader: false,
                });
            })
            .catch(error => {
                console.log("Error fetching and parsing data", error);
            });
    };

    /**
     * Filter by category
     * @param id
     */
    filterByCategory(id) {
        this.setState({
            categoryId: id
        });
        this.filterBy(id, this.state.rating)
    }

    /**
     * Filter by rates
     * @param rating
     */
    filterByRating(rating) {
        this.setState({
            rating: rating
        });
        this.filterBy(this.state.categoryId, rating);
    }

    /**
     * Filter By
     * @param categoryId
     * @param rating
     */
    filterBy(categoryId, rating){
        let data = {};
        if(rating){
            data.rating = rating
        }
        if(categoryId){
            data.categoryId = categoryId
        }
        this.setState({
            filteredProducts: _.filter(this.state.products, data)
        });
    }

    /**
     * Toggle display of sidebar
     * @param displaySidebar
     */
    toggleSidebar(displaySidebar) {
        this.setState({
            toggleSidebar: displaySidebar
        })
    }

    render() {
        return (
            <div className="home-wrapper">
                <Navbar toggleSidebar={this.toggleSidebar}/>
                <Header />
                <div className="home-wrapper-container">
                    <div
                        className="home-wrapper__filters"
                        style={
                            {
                                left: this.state.toggleSidebar ? '0' : '-60%',
                            }
                        }
                    >
                        <Filters
                            categories={this.state.categories}
                            filterByCategory={this.filterByCategory}
                            filterByRating={this.filterByRating}
                            products={this.state.products}
                        />
                    </div>

                    <div className="home-wrapper__cards">
                        <Cards
                            products={
                                this.state.filteredProducts
                            }
                            getProducts={this.getProducts}
                        />
                    </div>
                </div>
                {this.state.showLoader && <Loader />}
            </div>
        );
    }
}

export default Home;
