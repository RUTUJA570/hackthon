import orderContext from "./orderContext";
import { useState } from "react";

const orderState = (props) => {
  const host = "http://localhost:5000"
  const ordersInitial = []
  const [orders, setOrders] = useState(ordersInitial)

  // Get all Notes
  const getOrders = async () => {
    // API Call 
    const response = await fetch(`${host}/api/orders/fetchallorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0"
      }
    });
    const json = await response.json() 
    setOrders(json)
  }

  // Add a Order
  const addOrder = async (ProductName, description, ProductImage) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/orders/addorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0"
      },
      body: JSON.stringify({ProductName, description, ProductImage})
    });

    const order = await response.json();
    setOrders(orders.concat(order))
  }

  // Delete a Note
  const deleteOrder = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/orders/deleteorder/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0"
      }
    });
    const json = response.json(); 
    const newOrders = orders.filter((order) => { return order._id !== id })
    setOrders(newOrders)
  }

  // Edit a Note
  const editOrder = async (id, ProductName, description, ProductImage) => {
    // API Call 
    const response = await fetch(`${host}/api/orders/updateorder/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0"
      },
      body: JSON.stringify({ProductName, description, ProductImage})
    });
    const json = await response.json(); 

     let newOrders = JSON.parse(JSON.stringify(orders))
    // Logic to edit in client
    for (let index = 0; index < newOrders.length; index++) {
      const element = newOrders[index];
      if (element._id === id) {
        newOrders[index].ProductName = ProductName;
        newOrders[index].description = description;
        newOrders[index].ProductImage = ProductImage; 
        break; 
      }
    }  
    setOrders(newOrders);
  }

  return (
    <orderContext.Provider value={{orders, addOrder, deleteOrder, editOrder, getOrders}}>
      { props.children }
    </orderContext.Provider>
  )

}
export default orderState;