import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from "../imagenes/logo.png"
import Navbar1 from 'react-bootstrap/Navbar';


const Navbar = ({ brand }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container justify-content-center">
                <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo" className="navbar-brand-image"width="40" height="40" /> 
                <Navbar1.Brand href="#home" style={{marginLeft:"20px"}} className="rickFont">Rick and morty app By Deyvi</Navbar1.Brand>                
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
