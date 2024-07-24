import { StrictMode, useState, useEffect } from "react";
import Modal from "../addItemModal/addItemModal";
import Header from "./header"
import Item from "./item"
import AddItemButton from "./addItemButton";

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
          <AddItemButton 
  
  
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

function loadItems() {
    const itemList = JSON.parse(localStorage.getItem('prevList'))
    if (itemList) {
      items = itemList;
    } else {
      alert("no previous list to load")
    }
  }


export default App