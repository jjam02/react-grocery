// Modal.jsx
import React, { useState, useRef } from "react";
import "./addItemModal.css"; // Your CSS for the modal

const Modal = ({ isOpen, onClose, updateItems }) => {
    if (!isOpen) return null; // Do not render anything if the modal is not open

    // Refs for form inputs
    const nameRef = useRef(null);
    const qtyRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get values from inputs
        const name = nameRef.current.value;
        const qty = parseInt(qtyRef.current.value);

        // Call the updateItems function with the form values
        updateItems(name, qty);

        // Close the modal
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">Item Name:</label>
                    <input type="text" id="fname" name="name" ref={nameRef} /><br /><br />
                    <label htmlFor="qty">Quantity:</label>
                    <input type="number" id="qty" name="qty" ref={qtyRef} /><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default Modal;
