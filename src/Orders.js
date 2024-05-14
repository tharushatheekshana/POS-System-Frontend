import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./App.css";
import { useAuth } from "./utils/AuthContext";

function Orders() {
  const [orders, setOrders] = useState(null);
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOrders();
    }
  }, [isAuthenticated]);

  const getOrders = () => {
    axios
      .get(`http://localhost:8080/orders`, config)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      });
  };

  const handleCancelOrder = (orderId) => {
    axios
      .delete(`http://localhost:8080/orders/${orderId}`, config)
      .then(() => {
        toast.success("Order canceled successfully");
        getOrders();
      })
      .catch((error) => {
        console.error("Error canceling order:", error);
        toast.error("Failed to cancel order");
      });
  };

  const handleRemoveItemFromOrder = (orderId, itemId) => {
    axios
      .delete(`http://localhost:8080/orders/${orderId}/item/${itemId}`, config)
      .then(() => {
        toast.success("Item removed from order");
        getOrders();
      })
      .catch((error) => {
        console.error("Error removing item from order:", error);
        toast.error("Failed to remove item from order");
      });
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  };

  return (
    <div className="item-body">
      <div className="container">
        <h1 className="text-center mb-4">Orders</h1>
        {orders && orders.length === 0 ? (
          <div className="text-center">
            <p>No orders available</p>
          </div>
        ) : (
          <div>
            <table className="table table-striped rounded">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Date and Time</th>
                  <th>Table No</th>
                  <th>Order Items</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{formatDateTime(order.orderDate)}</td>
                      <td>{order.tableNo}</td>
                      <td>
                        <ul>
                          {order.orderItems.map((item) => (
                            <li key={item.id}>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <h5>{item.item.name}</h5>
                                  <p>
                                    Quantity: {item.quantity}, Price: Rs.{" "}
                                    {item.item.price}
                                  </p>
                                </div>
                                <span>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleRemoveItemFromOrder(
                                        order.id,
                                        item.item.id
                                      )
                                    }
                                  >
                                    Remove
                                  </button>
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>Rs.{order.totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
