import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";
import Modal from "./addItemModal/addItemModal";



let items = [];


const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <span className="total-items">Items: {props.itemTotal}</span>
    </header>
  );
};

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

const AddItem = (props) => {
  const itemClass = props.isEven ? "item-even" : "item-odd";

  return (
    <div onClick={props.onClick} className='add-button'>
      <span className="add-text">{props.name}</span>


    </div>
  );
};

const App = (props) => {
  const [items, setItems] = useState(props.itemList)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveList = (action, popup = false) => {
    localStorage.setItem("prevList", JSON.stringify(items));
    if (popup) {
      alert("List Saved")
    }
    console.log("list save ACTION: " + action)
    console.log(items)

  }
  const handleRemoveItem = (id) => {
    setItems(prevItems => prevItems.filter(i => i.id != id))

  }

  const handleAddItems = (name, qty) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: prevItems.length + 1, // Ensure unique ID
        name: name,
        quantity: qty,
      }
    ]);

  };

  const handleQuantityChange = (id, newQty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );

  };

  const openModal = () => {
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);

  }

  useEffect(() => {
    saveList("STATE CHANGE");
  }, [items]);

  return (
    <div className="grocery-list-container">
      <button className="save-button" onClick={() => saveList("button", true)}>Save List</button>

      <div className="grocery-list">
        <Header title="Grocery List" itemTotal={items.length} />
        {items.map((item, index) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            isEven={index % 2 === 0}
            qty={item.quantity}
            rmvItem={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <AddItem


          name="Add Item"
          isEven={true}
          qty={0}
          rmvItem={handleRemoveItem}
          onQuantityChange={handleQuantityChange}
          onClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal} updateItems={handleAddItems} />
        {/* <button onClick={uploadImage}>upload img</button>
        <input type="file" id="imageInput" /> */}
      </div>


    </div>
  );

};
const root = createRoot(document.getElementById("root"));
loadItems();
root.render(
  <StrictMode>
    <App itemList={items} />
  </StrictMode>
);


function loadItems() {
  const itemList = JSON.parse(localStorage.getItem('prevList'))
  if (itemList) {
    items = itemList;
  } else {
    alert("no previous list to load")
  }
}

// async function uploadImage() {
//   const input = document.getElementById('imageInput');
//   const file = input.files[0];

//   if (!file) {
//     alert('Please select a file to upload.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('image', file);

//   try {
//     const response = await fetch('https://api.imgur.com/3/image', {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Client-ID dc9f6a611d4bdda'
//       },
//       body: formData
//     });

//     const data = await response.json();

//     if (data.success) {
//       const imageUrl = data.data.link;
//       document.getElementById('result').innerHTML = `<p>Image URL: <a href="${imageUrl}" target="_blank">${imageUrl}</a></p>`;
//     } else {
//       console.error('Error uploading image:', data.data.error);
//       document.getElementById('result').innerHTML = `<p>Error: ${data.data.error}</p>`;
//     }
//   } catch (error) {
//     console.error('Upload failed:', error);
//     document.getElementById('result').innerHTML = `<p>Upload failed. Please try again.</p>`;
//   }
// }



