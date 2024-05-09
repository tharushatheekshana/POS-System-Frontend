import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Home() {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [quantityMap, setQuantityMap] = useState(new Map());
  const [table, setTable] = useState("");
  const [orders, setOrders] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8080/orders/${orderId}`)
      .then((response) => {
        // console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function createOrder(table) {
    if (table.trim() === "") {
      toast.error("Please enter a table number.");
      return;
    }
    // console.log("Table Number:", table);
    const data = {
      tableNo: table,
    };

    axios
      .post("http://localhost:8080/orders", data)
      .then(function (res) {
        // setOrder(res.data);
        setOrderId(res.data.id);
        setIsOrderCreated(true); // Set isOrderCreated to true when order is created

        toast.success("Table Added Successfully!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addItemToOrder(item) {
    if (!isOrderCreated) {
      // Display warning if order is not created
      toast.error("Please add a table first");
      return;
    }

    const quantity = quantityMap.get(item.id) || 1; // Get quantity from map or default to 1

    const data = {
      itemId: item.id,
      quantity: quantityMap.get(item.id) || 1,
      // tableNo: table,
    };

    axios
      .post(`http://localhost:8080/orders/${orderId}/addItem`, data)
      .then((response) => {
        // console.log(data);
        // console.log(response.data);
        setQuantityMap(new Map()); // Clear the quantity map after adding item to order
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeItemFromOrder(itemId) {
    axios
      .delete(`http://localhost:8080/orders/${orderId}/item/${itemId}`)
      .then((response) => {
        console.log(orderId);
        console.log(itemId);
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addItemToCart(item) {
    const quantity = quantityMap.get(item.id) || 1; // Get quantity from map or default to 1

    const data = {
      name: item.name, // Access item name properly
      quantity: quantityMap.get(item.id) || 1,
      price: item.price,
    };
    axios
      .post(`http://localhost:8080/cart`, data)
      .then((response) => {
        setQuantityMap(new Map());
        setCart(response.data);
        toast.success("Item added to cart");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // function getRandomColor() {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  function handleOrderCancel() {
    axios
      .delete(`http://localhost:8080/orders/${orderId}`)
      .then((response) => {
        console.log(response.data);
        setOrderId("");
        setIsOrderCreated(false);
        setOrders(null);
        setTable("");
        setQuantityMap(new Map());
        toast.error("Order Cancelled!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleIncreaseQuantity(itemId) {
    setQuantityMap((prevQuantityMap) => {
      const currentQuantity = prevQuantityMap.get(itemId) || 0;
      return new Map(prevQuantityMap).set(itemId, currentQuantity + 1);
    });
  }

  function handleDecreaseQuantity(itemId) {
    setQuantityMap((prevQuantityMap) => {
      const currentQuantity = prevQuantityMap.get(itemId) || 0;
      if (currentQuantity > 1) {
        return new Map(prevQuantityMap).set(itemId, currentQuantity - 1);
      }
      return prevQuantityMap;
    });
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const data = {
      quantity: newQuantity,
    };

    console.log("Updating quantity:", id, newQuantity);

    axios
      .put(`http://localhost:8080/order/${orderId}`, data)
      .then(() => {})
      .catch((error) => {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <Menu />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-7">
          <div className="container mt-3">
            {categories &&
              items &&
              categories.map((category) => (
                <div key={category.id}>
                  <h2>{category.name}</h2>
                  <hr />

                  <div className="row">
                    {items
                      .filter((item) => item.category.id === category.id)
                      .map((item) => (
                        <div className="col-md-3 col-sm-5 mb-4" key={item.id}>
                          <div
                            className="card "
                            // style={{ backgroundColor: "#D6F6C9" }}
                          >
                            <img
                              src={`/images/${item.image}`}
                              className="card-img-top"
                              alt={item.name}
                            />
                            <div className="card-body">
                              <p className="card-text">
                                {item.id}.{" "}
                                <h5 className="card-title"> {item.name}</h5>
                              </p>
                              <span style={{ float: "right" }}>
                                <button
                                  className="btn btn-warning btn-sm"
                                  onClick={() => addItemToCart(item)}
                                >
                                  <i class="bi bi-cart-plus-fill"></i>
                                </button>
                              </span>
                              <p className="badge bg-primary rounded-pill">
                                Rs. {item.price}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-primary  btn-sm"
                                    onClick={() =>
                                      handleDecreaseQuantity(item.id)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="mx-2">
                                    {quantityMap.get(item.id) || 0}
                                  </span>

                                  <button
                                    type="button"
                                    className="btn btn-primary  btn-sm"
                                    onClick={() =>
                                      handleIncreaseQuantity(item.id)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-outline-success btn-sm"
                                  onClick={() => {
                                    addItemToOrder(
                                      item,
                                      quantityMap.get(item.id)
                                    );
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-3 ">
          <div className="container mt-3">
            <div className="checkout position-fixed">
              <h2>Enter Table Number</h2>
              <div className="input-group mb-3">
                {isOrderCreated ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Table Number"
                    value={table}
                    readOnly // Make the input field read-only
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Table Number"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                  />
                )}
                <button
                  onClick={() => createOrder(table)}
                  className="btn btn-primary"
                  disabled={isOrderCreated} // Disable the button after order creation
                >
                  Add Table
                </button>
              </div>
              <h1>Check Out</h1>
              <hr />
              <div className="row ">
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h5>Table No: {table} </h5>
                    </div>
                    <div className="col-1">
                      <button onClick={handleOrderCancel}>
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                  <ul
                    className="list-group list-group-flush"
                    style={{ maxHeight: "400px", overflow: "auto" }}
                  >
                    {orders &&
                      orders.orderItems.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {item.quantity} x {item.item.name}
                          <span className="badge bg-primary rounded-pill ms-2">
                            Rs. {item.item.price * item.quantity}
                          </span>
                          <div className="col-4 text-end">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItemFromOrder(item.item.id)}
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="col mt-3 position-fixed bottom-0 end-1 mb-3 me-3">
                <h4>
                  Total: Rs.
                  {orders &&
                    orders.orderItems.reduce(
                      (total, item) => total + item.item.price * item.quantity,
                      0
                    )}
                </h4>
              </div>
              <button
                className="btn btn-success btn-lg position-fixed bottom-0 end-0 mb-3 me-3"
                // onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
