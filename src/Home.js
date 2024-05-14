import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Menu";
import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "./App.css";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "./utils/AuthContext";
import { useContext } from "react";
import CheckOut from "./CheckOut";
import { useOrder } from "./OrderContext";

function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [quantityMap, setQuantityMap] = useState(new Map());
  const [orders, setOrders] = useState(null);
  console.log("Home.js", orders);
  const [cart, setCart] = useState(null);
  const [show, setShow] = useState(false);
  const { isAuthenticated, jwtToken } = useAuth();
  const [orderComplete, setOrderComplete] = useState(false);

  const { isOrderCreated, orderId, table } = useOrder();
  console.log(isOrderCreated, orderId, table);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/items", config)
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("http://localhost:8080/categories", config)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated]); // Adding isAuthenticated as a dependency

  function addItemToOrder(item) {
    if (!isOrderCreated || !orderId || !table) {
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
      .post(`http://localhost:8080/orders/${orderId}/addItem`, data, config)
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

  function addItemToCart(item) {
    const quantity = quantityMap.get(item.id) || 1; // Get quantity from map or default to 1

    const data = {
      name: item.name, // Access item name properly
      quantity: quantityMap.get(item.id) || 1,
      price: item.price,
      image: item.image,
    };
    axios
      .post(`http://localhost:8080/cart`, data, config)
      .then((response) => {
        setQuantityMap(new Map());
        setCart(response.data);
        toast.success("Item added to cart");
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

  return (
    <div className="">
      <div className="row">
        <div className="col custom-menu">
          <Menu />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-7 item-body">
          <div className="container mt-3">
            <nav
              id="navbar-example2"
              className="navbar  position-fixed"
              style={{
                width: "56%",
                top: "0.5",
                zIndex: "1000",
                backgroundColor: "white", // Solid background color to prevent content penetration
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for better visibility
              }}
            >
              <ul className="nav nav-pills d-flex flex-row">
                {categories &&
                  categories.map((category) => (
                    <li className="nav-item" key={category.name}>
                      <a className="nav-link" href={`#${category.name}`}>
                        {category.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy-example bg-body-tertiary p-3 rounded-2"
              tabIndex="0"
              // style={{ paddingTop: "1000px" }} // Adjust this value based on your navbar height
            >
              {categories.map((category) => (
                <div key={category.id}>
                  <h2 id={category.name}>{category.name}</h2>
                  <hr />
                  <div className="row">
                    {items
                      .filter((item) => item.category.id === category.id)
                      .map((item) => (
                        <div className="col-md-3 col-sm-5 mb-4" key={item.id}>
                          <div className="card">
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
                                  <i className="bi bi-cart-plus-fill"></i>
                                </button>
                              </span>
                              <p className="badge bg-primary rounded-pill">
                                Rs. {item.price}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
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
                                    className="btn btn-primary btn-sm"
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
        </div>
        <div className="col-3 custom-checkout">
          <CheckOut orders={orders} />
        </div>
      </div>
    </div>
  );
}

export default Home;
