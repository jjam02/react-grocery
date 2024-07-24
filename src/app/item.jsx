import { StrictMode, useState, useEffect } from "react";
import Counter from "./counter"

const Item = (props) => {
    const itemClass = props.isEven ? "item-even" : "item-odd";
  
    return (
      <div className={itemClass}>
        <button className="remove-item" onClick={() => props.rmvItem(props.id)}></button>
        <span className="item-name">{props.name}</span>
        <Counter qty={props.qty} even={props.isEven} id={props.id} onQuantityChange={props.onQuantityChange} />
      </div>
    );
  };

  export default Item;