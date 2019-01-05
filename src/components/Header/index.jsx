import React, { Component } from 'react';
import './_header.sass';

function Header() {
    return (
        <div className="header-wrapper">
            <div className="header-wrapper__overlay">
                <div className="header-wrapper__title">
                    Welcome to our <b>E-commerce store</b>
                </div>
                <div className="header-wrapper__sub-title">
                    Choose one of our awesome categories from below
                </div>
            </div>
        </div>
    );
}

export default Header;
