import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const host = "http://localhost:5000";
  const ordersInitial = [];
  const [orders, setOrders] = useState(ordersInitial);
  const navigate = useNavigate();
  const [edit,setEdit] = useState(false);

  // Get all Notes
  const getOrders = async () => {
    // API Call
    const response = await fetch(`${host}/api/orders/fetchallorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0",
      },
    });
    const json = await response.json();
    setOrders(json);
  };

  // Delete a Note
  const deleteOrder = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/orders/deleteorder/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0",
      },
    });
    const json = response.json();
    const newOrders = orders.filter((order) => {
      return order._id !== id;
    });
    setOrders(newOrders);
  };

  // Edit a Note
  const editOrder = async (id, ProductName, status, ProductImage) => {
    // API Call
    const response = await fetch(`${host}/api/orders/updateorder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYjNjMGZkOGU5YzYxMGZlMDg0YmEyIn0sImlhdCI6MTcyNjY5MjM2N30.7pQOElPNdJ5-OLRfh2dmrF_H41ljcPtzi3gU7s-ehX0",
      },
      body: JSON.stringify({ ProductName, status, ProductImage }),
    });
    const json = await response.json();

    let newOrders = JSON.parse(JSON.stringify(orders));
    // Logic to edit in client
    for (let index = 0; index < newOrders.length; index++) {
      const element = newOrders[index];
      if (element._id === id) {
        newOrders[index].ProductName = ProductName;
        newOrders[index].status = status;
        newOrders[index].ProductImage = ProductImage;
        break;
      }
    }
    setOrders(newOrders);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [order, setOrder] = useState({
    id: "",
    eProductName: "",
    estatus: "",
    eProductImage: "",
  });

  const updateOrder = (currentNote) => {
    ref.current.click();
    setOrder({
      id: currentNote._id,
      eProductName: currentNote.ProductName,
      estatus: currentNote.status,
      eProductImage: currentNote.ProductImage,
    });
    setEdit(true);
  };
  console.log(order);
  const handleClick = (e) => {
    editOrder(order.id, order.eProductName, order.estatus, order.eProductImage);
    refClose.current.click();
    setEdit(false);
  };

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  console.log(orders);
  return (
    <div>
      <div className=" relative search-box">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-lg font-medium text-gray-700  dark:text-gray-400">
            <tr>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Category</span>
                </div>
              </td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                <form class="max-w-md mx-auto">
                  <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-3 h-3 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Mockups, Logos..."
                      required
                    />
                    <button
                      type="submit"
                      class="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </td>
              <td class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                <button
                  type="submit"
                  onClick={() => navigate("../AddCategory")}
                  class="text-white p-5 py-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add New
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>

      <div className="relative order-table">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="px-6 py-4">{order._id}</td>
                  <td class="px-6 py-4">{order.ProductName}</td>
                  <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    <img width={20} height={40} src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Frefurbiphones.ie%2Fproduct%2Fbrand-new-apple-iphone-13-unlocked-mobile-phone-portlaoise-laois%2F&psig=AOvVaw2Y8MdkTPqObZEu0h97BJM2&ust=1726831668524000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDO7rPzzogDFQAAAAAdAAAAABAJ'} alt='' />
                  </td>
                  <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    <span
                      className={` ${
                        order.status === "Active"
                          ? "text-green-500"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 space-x-4">
                    <i onClick={() => updateOrder(order)}>Edit</i>{" "}
                    <i onClick={() => deleteOrder(order._id)}>Delete</i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={order.eProductName} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Status</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={order.estatus} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Image</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={order.eProductImage} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={order.eProductName.length<5 || order.estatus.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div> */}

<div  className={` w-[400px] absolute top-[20%] left-[40%] ${edit ? ' ' : ' hidden'} `}>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
        <form class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="mb-5">
            <label
              for="eProductName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="eProductName"
              name="eProductName"
              value={order.eProductName} onChange={onChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ProductName"
              required
            />
          </div>
          <div className="mb-5">
          <select id="status" name="status" value={order.estatus} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a Status</option>
    <option value="Active">Activ</option>
    <option value="Inactive">Inactive</option>
  </select>
          </div>
          <div className="mb-5 flex">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-4 h-4 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
            
        </div>
        <input id="dropzone-file" type="file" name="ProductImage"  onChange={onChange} class="hidden" />
    </label>
          </div>

          <div className="mb-5 w-[150px] h-22 border-dotted">
          <img  src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Frefurbiphones.ie%2Fproduct%2Fbrand-new-apple-iphone-13-unlocked-mobile-phone-portlaoise-laois%2F&psig=AOvVaw2Y8MdkTPqObZEu0h97BJM2&ust=1726831668524000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDO7rPzzogDFQAAAAAdAAAAABAJ'} alt="unknown" />
          </div>

          <div className="mb-5 flex space-x-5"><button
            type="submit"
            onClick={handleClick}
            // disabled={}
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
          <button
            type="submit"
            ref={refClose}
            // disabled={}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Close
          </button></div>
        </form>
      </div>

    </div>
  );
};

export default Category;
