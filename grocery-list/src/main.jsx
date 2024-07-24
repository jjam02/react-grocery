import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";
import App from "./app/app";



let items = [];

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



