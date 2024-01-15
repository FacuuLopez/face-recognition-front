import React from "react";
import Tilt from 'react-parallax-tilt';
import logo from './logo.png';
import './logo.css';

const Logo = () => {
  return (
    <Tilt className="tilt">
        <img src={logo} alt="Facundo Lopez" ></img>
    </Tilt>
  );
}

export default Logo;