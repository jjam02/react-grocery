import { StrictMode, useState, useEffect } from "react";


const AddItemButton = (props) => {
    const itemClass = props.isEven ? "item-even" : "item-odd";
  
    return (
      <div onClick={props.onClick} className='add-button'>
        <span className="add-text">{props.name}</span>
  
  
      </div>
    );
  };
  


export default AddItemButton;