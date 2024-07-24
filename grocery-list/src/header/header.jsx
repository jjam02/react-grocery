import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";


const Header = (props) => {
    return (
      <header>
        <h1>{props.title}</h1>
        <span className="total-items">Items: {props.itemTotal}</span>
      </header>
    
  };

export default Header;