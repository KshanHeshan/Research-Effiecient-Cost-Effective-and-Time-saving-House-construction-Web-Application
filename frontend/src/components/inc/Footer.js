import React, { Component } from 'react';
import FooterLogo from '../css/img/Home_Construction_logo_White.png';
import '../css/custom.css';

class Footer extends Component {
    render() {
        return (
            // Footer
            <footer id="mainFooter" className="fire_gradient">
               <img className="footer_image" src={FooterLogo} alt=""/> &copy; Home Construction
                2020
            </footer>
        );
    }
}

export default Footer
