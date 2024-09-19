import React from "react";
import {useState} from 'react'
import { NavLink } from "react-router-dom";

const AddCategory = () => {
   
    const host = "http://localhost:5000"
  const ordersInitial = []
  const [orders, setOrders] = useState(ordersInitial)
   // Add a Order
   const addOrder = async (ProductName, status, ProductImage) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/orders/addorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0"
      },
      body: JSON.stringify({ProductName, status, ProductImage})
    });
    
    const order = await response.json();
    setOrders(orders.concat(order))
    console.log(orders)
    
  }

    const [order, setOrder] = useState({ProductName: "",status : "item dection", ProductImage: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addOrder(order.ProductName ,order.status, order.ProductImage);
        setOrder({ProductName: "",status : "Active", ProductImage: ""})
    }

    const onChange = (e)=>{
        setOrder({...order, [e.target.name]: e.target.value})
    }
    console.log(order)
  return (
    <div className="mt-5">
      <div className="space-x-6 flex">
        <NavLink to="/auth/Category" className="mt-1">
          <svg
            class="w-6 h-6 bottom-2 text-gray-400 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </NavLink>
        <h2 className="text-xl font-medium">Add Category</h2>
      </div>

      <div className="translate-x-1/3 translate-y-1/4">
        <form class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="mb-5">
            <label
              for="ProductName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="ProductName"
              id="ProductName"
              name="ProductName"
              value={order.ProductName} onChange={onChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ProductName"
              required
            />
          </div>
          <div className="mb-5">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-40 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-4 h-4 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
            
        </div>
        <input id="dropzone-file" type="file" name="ProductImage" onChange={onChange} class="hidden" />
    </label>
          </div>

          <button
            type="submit"
            onClick={handleClick}
            disabled={order.ProductName.length<5}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
