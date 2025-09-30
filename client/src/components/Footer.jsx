import React from 'react'
import Logo from "../img/logo.png"

const Footer = () => {
  return (
    <footer>
        <img src={Logo} alt="" />
        <span>
            © {new Date().getFullYear()} · Made by Güldane Köse 🌹
        </span>
    </footer>
  );
};

export default Footer