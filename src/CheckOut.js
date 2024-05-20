import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "./utils/AuthContext";
import { Button, Modal } from "react-bootstrap";
import { useOrder } from "./utils/OrderContext";
import "./App.css";

function CheckOut({ orders }) {
  console.log("Orders:", orders);

  const { isAuthenticated, jwtToken } = useAuth();
  // const [orders, setOrders] = useState(null);
  const [show, setShow] = useState(false);

  const modalBodyRef = useRef(null);

  const [quantityMap, setQuantityMap] = useState(new Map());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    setIsOrderCreated,
    setOrderId,
    setTable,
    orderId,
    isOrderCreated,
    table,
  } = useOrder(); // Import orderId and isOrderCreated from OrderContext
  console.log("orderId", orderId);
  console.log("isOrderCreated", isOrderCreated);
  console.log("table", table);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated && isOrderCreated && orderId) {
      axios
        .get(`http://localhost:8080/orders/${orderId}`, config)
        .then((response) => {
          // setOrders(response.data);
        });
    }
  }, [isAuthenticated, isOrderCreated, orderId]);

  const handlePrint = useReactToPrint({
    content: () => modalBodyRef.current,
  });

  function calculateDiscount(orders) {
    if (!orders || !orders.orderItems) {
      return 0;
    }

    const total = orders.orderItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    );

    return total * 0.05;
  }

  function calculateServiceCharge(orders) {
    if (!orders || !orders.orderItems) {
      return 0;
    }

    const total = orders.orderItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    );

    return total * 0.1;
  }

  function calculateGrandTotal(orders) {
    if (!orders || !orders.orderItems) {
      return 0;
    }

    const total = orders.orderItems.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0
    );

    return total - calculateDiscount(orders) + calculateServiceCharge(orders);
  }

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
      .post("http://localhost:8080/orders", data, config)
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

  function removeItemFromOrder(itemId) {
    axios
      .delete(`http://localhost:8080/orders/${orderId}/item/${itemId}`, config)
      .then((response) => {
        console.log(orderId);
        console.log(itemId);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleOrderCancel() {
    axios
      .delete(`http://localhost:8080/orders/${orderId}`, config)
      .then((response) => {
        console.log(response.data);
        setOrderId("");
        setIsOrderCreated(false);
        setTable("");
        orders.orderItems = [];
        orders = null;
        setQuantityMap(new Map());
        toast.error("Order Cancelled!");
      })
      .catch((error) => {
        console.error(error);
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
      .put(`http://localhost:8080/order/${orderId}`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity");
      });
  };

  function handlePlaceOrder() {
    const data = {
      orderComplete: 1,
    };

    axios
      .put(`http://localhost:8080/orders/${orderId}`, data, config)
      .then((response) => {
        console.log(response.data);
        setOrderId("");
        setIsOrderCreated(false);
        setTable("");
        orders.orderItems = [];
        orders = null;
        setQuantityMap(new Map());
        toast.success("Order placed successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      {/* {CheckOut Page} */}
      <div className="">
        <div className="">
          <div className="checkout position-fixed">
            <h2>Enter Table Number</h2>
            <div className="input-group mb-3">
              {isOrderCreated ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Table Number"
                  value={table}
                  readOnly
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
                disabled={isOrderCreated}
              >
                Add Table
              </button>
            </div>
            <h1>Check Out</h1>
            <hr />
            {/* <div className="row"> */}
            {/* <div className="col"> */}
            <div className="row">
              <div className="col">
                <h5>Table No: {table} </h5>
              </div>
              <div className="col-2">
                <button onClick={handleOrderCancel}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>

            <ul
              className="list-group list-group-flush"
              style={{ maxHeight: "300px", overflow: "auto" }}
            >
              {orders &&
                orders.orderItems &&
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
                      <i className="bi bi-trash3"></i>
                    </button>
                  </li>
                ))}
            </ul>
            {/* </div> */}
            {/* </div> */}
            <div className="col mt-3 position-fixed bottom-1 end-1 mb-3 me-3"></div>
            <div className="position-fixed bottom-0 end-0 mb-1 me-4">
              <div className="col mt-3 end-1 me-3">
                <h4>
                  Discount: Rs. {calculateDiscount(orders)} <br />
                  Service Charge: Rs. {calculateServiceCharge(orders)} <br />
                  Grand Total: Rs. {calculateGrandTotal(orders)}
                </h4>
              </div>

              <div className="btn-group" role="group" aria-label="Button group">
                <button className="order-button me-2" onClick={handleShow}>
                  Print Invoice
                </button>
                <button className="order-button" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>

            <Modal
              show={show}
              onHide={handleClose}
              id="modalContent"
              size="lg"
              className="modal-dark"
            >
              <Modal.Header closeButton>
                <Modal.Title>Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body ref={modalBodyRef}>
                <div className="container">
                  <div className="row justify-content-center">
                    {" "}
                    <div className="col-md-8">
                      {" "}
                      <h2 className="text-center mb-4">
                        <i className="fas fa-utensils"></i> Shanghai Family
                        Restaurant
                      </h2>
                      <div className="d-flex justify-content-between mb-1">
                        <p>
                          <i className="fas fa-calendar-alt"></i>
                          <strong> Date:</strong>{" "}
                          {new Date().toLocaleDateString()} <br />
                          <strong> Time:</strong>{" "}
                          {new Date().toLocaleTimeString()}
                        </p>
                        <p>
                          <i className="fas fa-receipt"></i>
                          <strong> Order ID:</strong> {orderId}
                        </p>
                      </div>
                      {/* <div className="d-flex align-items-center mb-3">
                          <i className="fas fa-map-marker-alt mr-2"></i>
                          <p className="text-break">
                            {" "}
                            <strong>Shipping address:</strong> 27 B, Horana
                            Road, Panadura
                          </p>
                        </div>
                        <p>
                          <i className="fas fa-phone"></i>
                          <strong> Phone number:</strong> 123-456-7890
                        </p> */}
                      <hr className="my-1" />{" "}
                      <p>
                        <strong>Order Items:</strong>
                      </p>
                      <div className="list-group">
                        {orders &&
                          orders.orderItems &&
                          orders.orderItems.map((item) => (
                            <div className="list-group-item " key={item.id}>
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.item.name}</h5>
                                <small>Quantity: {item.quantity}</small>
                              </div>
                              <p className="mb-1">
                                Price: Rs. {item.item.price.toFixed(2)}
                              </p>
                            </div>
                          ))}
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        {" "}
                        <p>Discount: Rs. {calculateDiscount(orders)}</p>
                        <p>
                          Service Charge: Rs. {calculateServiceCharge(orders)}
                        </p>
                      </div>
                      <p className="text-center font-weight-bold">
                        {" "}
                        Grand Total: Rs. {calculateGrandTotal(orders)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4">Thank you for your order!</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={handlePrint}>Print</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export { useOrder };
export default CheckOut;
