import { StrictMode, useState, useEffect } from "react";


const Counter = (props) => {
    const itemClass = props.even ? ['increment', 'decrement'] : ['increment-odd', 'decrement-odd'];
    const [qty, setQty] = useState(props.qty);
  
    const incrementQuantity = () => {
      const newQty = qty + 1;
      setQty(newQty);
      props.onQuantityChange(props.id, newQty);
    };
  
    const decrementQuantity = () => {
      if (qty > 0) {
        const newQty = qty - 1;
        setQty(newQty);
        props.onQuantityChange(props.id, newQty);
      }
    };
  
    return (
      <div className="quantity">
        <span className="qty-label">QTY</span>
        <button className={itemClass[0]} onClick={incrementQuantity}>
          +
        </button>
        <button className={itemClass[1]} onClick={decrementQuantity}>
          -
        </button>
        <span className="quantity-amount">{qty}</span>
      </div>
    );
  };

  export default Counter;